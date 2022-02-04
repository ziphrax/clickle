import {injectable, BindingScope} from '@loopback/core';
import { Action } from '../models/action.model';
import { ActionResponse } from '../models/action-response.model';
import { GameState, Player } from '../models';
import GAME_ACTIONS from '../data/actions.game.data';
import PLAYER_ACTIONS from '../data/actions.player.data';
import { repository } from '@loopback/repository';
import { GameStateRepository, PlayerRepository } from '../repositories';

function gameReducer(action: Action, player: Player, gameState: GameState): GameState{
  switch(action.action){
    case GAME_ACTIONS.ACTION_GAME_DEV_TEST:
      return gameState;
    default:
      throw new Error("Action not supported");
  }
}

function playerReducer(action: Action): object{
  switch(action.action){
    case PLAYER_ACTIONS.ACTION_PLAYER_DEV_TEST:
      return {};
    default:
      throw new Error("Action not supported");
  }
}

@injectable({scope: BindingScope.TRANSIENT})
export class ActionService {
  constructor(
    @repository(PlayerRepository) public playerRepository: PlayerRepository,
    @repository(GameStateRepository) public gameStateRepository: GameStateRepository
  ) {}

  async resolveGameAction(action: Action, activePlayerId: string,  gameStateId: string): Promise<ActionResponse> {
    action.timestamp = new Date();

    const player = await this.playerRepository.findById(activePlayerId);
    const currentGameState = await this.gameStateRepository.findById(gameStateId);

    const newGameState = gameReducer(action, player, currentGameState);

    await this.gameStateRepository.updateById(gameStateId, newGameState);

    return {
      action: action.action,
      timestamp: action.timestamp,
      payload: {requestedAction: action, result: newGameState}
    } as ActionResponse;
  }

  async resolvePlayerAction(action: Action): Promise<ActionResponse> {
    action.timestamp = new Date();

    const result = playerReducer(action);

    return {
      action: action.action,
      timestamp: action.timestamp,
      payload: {requestedAction: action, result}
    } as ActionResponse;
  }
}
