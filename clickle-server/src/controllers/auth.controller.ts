// Uncomment these imports to begin using these cool features!

import { service } from "@loopback/core";
import { getModelSchemaRef, post, requestBody } from "@loopback/rest";
import { LoginRequest, Player } from "../models";
import { LoginResponse } from "../models/login-response.model";
import { AuthenticationService } from "../services";

// import {inject} from '@loopback/core';


export class AuthController {
  constructor(
    @service(AuthenticationService)
    public authenticationService: AuthenticationService,
  ) { }

  @post('/login')
  async login(@requestBody({
    content: {
      'application/json':{
        schema: getModelSchemaRef(LoginRequest)
      }
    }
  }) loginRequest: LoginRequest): Promise<LoginResponse> {
    return this.authenticationService.login(loginRequest);
  }

  @post('/register')
  async register(@requestBody({
    content: {
      'application/json':{
        schema: getModelSchemaRef(Player, {exclude: ['playerId','createdDate','lastLoginDate','salt']})
      }
    }
  }) player: Player) : Promise<LoginResponse> {
    return this.authenticationService.register(player);
  }

}
