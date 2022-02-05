import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { Action, GameState, Player } from '../models';
import GAME_ACTIONS from '../data/actions.game.data';

@injectable({scope: BindingScope.TRANSIENT})
export class GameReducerService {
  constructor(/* Add @inject to inject parameters */) {}

  async reduce(action: Action, player: Player, gameState: GameState): Promise<GameState>{
    switch(action.action){
      case GAME_ACTIONS.ACTION_GAME_DEV_TEST:
        return gameState;
      default:
        throw new Error("Action not supported");
    }
  }
}
