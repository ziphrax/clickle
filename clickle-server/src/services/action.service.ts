import {injectable, BindingScope, service} from '@loopback/core';
import { Action } from '../models/action.model';
import { ActionResponse } from '../models/action-response.model';
import GAME_ACTIONS from '../data/actions.game.data';
import PLAYER_ACTIONS from '../data/actions.player.data';
import { repository } from '@loopback/repository';
import { GameStateRepository, PlayerRepository } from '../repositories';
import { PlayerReducerService } from './player-reducer.service';
import { GameReducerService } from './game-reducer.service';

@injectable({scope: BindingScope.TRANSIENT})
export class ActionService {
  constructor(
    @service(PlayerReducerService) public playerReducerService: PlayerReducerService,
    @service(GameReducerService) public gameReducerService: GameReducerService,
    @repository(PlayerRepository) public playerRepository: PlayerRepository,
    @repository(GameStateRepository) public gameStateRepository: GameStateRepository,
  ) {}

  async resolveGameAction(action: Action, activePlayerId: string,  gameStateId: string): Promise<ActionResponse> {
    action.timestamp = new Date();

    const player = await this.playerRepository.findById(activePlayerId);
    const currentGameState = await this.gameStateRepository.findById(gameStateId);

    if(!player && !currentGameState) throw new Error("Invalid player or game state");

    const newGameState = await this.gameReducerService.reduce(action, player, currentGameState);

    await this.gameStateRepository.updateById(gameStateId, newGameState);

    return {
      action: action.action,
      timestamp: action.timestamp,
      payload: {requestedAction: action, result: newGameState}
    } as ActionResponse;
  }

  async resolvePlayerAction(action: Action, activePlayerId: string,): Promise<ActionResponse> {
    action.timestamp = new Date();

    const player = await this.playerRepository.findById(activePlayerId);
    const result = await this.playerReducerService.reduce(action, player);

    return {
      action: action.action,
      timestamp: action.timestamp,
      payload: {requestedAction: action, result}
    } as ActionResponse;
  }

  async getGameActions(): Promise<string> {
    return Promise.resolve(JSON.stringify(GAME_ACTIONS, null, 2));
  }

  async getPlayerActions(): Promise<string> {
    return Promise.resolve(JSON.stringify(PLAYER_ACTIONS, null, 2));
  }

}
