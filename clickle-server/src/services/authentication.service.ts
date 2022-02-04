import {injectable, BindingScope} from '@loopback/core';
import { LoginRequest, Player } from '../models';
import { LoginResponse } from '../models/login-response.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { repository } from '@loopback/repository';
import { PlayerRepository } from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class AuthenticationService {
  constructor(@repository(PlayerRepository) public playerRepository: PlayerRepository) {}

  generateAccessToken(playerEmail: string) {
    return jwt.sign(playerEmail, process.env.JWT_SECRET ?? 'secret', { expiresIn: '1800s' });
  }

  authenticateToken(token: string): string {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET ?? 'secret');
      return decoded as string;
    } catch (error) {
      throw new Error("Auth failed");
    }
  }

  async login(loginRequest: LoginRequest): Promise<LoginResponse>{
    const player = await this.playerRepository.findOne({where: {playerEmail: loginRequest.playerEmail}});

    if(player && player.password){
      const validPassword = await bcrypt.compare(player.password, loginRequest.password);

      if(validPassword){
        return {
          playerId: player.playerId,
          playerEmail: player.playerEmail,
          token: `Bearer ${this.generateAccessToken(player.playerEmail)}`
        } as LoginResponse;
      } 
    } 
    throw new Error("Auth failed");
  }

  async register(player: Player): Promise<LoginResponse>{
    const salt = await bcrypt.genSalt(10);

    player.salt = salt;

    if(!player.password){
      throw new Error("Password is required");
    } else {
      player.password = await bcrypt.hash(player.password , salt);;

      const result = await this.playerRepository.create(player);
  
      return {
        playerId: result.playerId ?? "unknown",
        playerEmail: result.playerEmail,
        token: `Bearer ${this.generateAccessToken(result.playerEmail)}`
      } as LoginResponse
    }
  }
}
