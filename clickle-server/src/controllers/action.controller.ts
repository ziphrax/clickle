import { authenticate } from "@loopback/authentication";
import { service } from "@loopback/core";
import { get, getModelSchemaRef, param, post, requestBody } from "@loopback/rest";
import { ActionResponse } from "../models/action-response.model";
import { Action } from "../models/action.model";
import {ActionService} from '../services'

@authenticate('jwt')
export class ActionController {
  constructor(@service(ActionService) public actionService: ActionService) {}

  @get('/actions/game')
  async getGameActions(): Promise<string>{
    return this.actionService.getGameActions();
  }

  @get('/actions/player')
  async getPlayerActions(): Promise<string>{
    return this.actionService.getPlayerActions();
  }

  @post('/actions/game/{gameId}')
  async resolveGameAction(
    @param.path.string('gameId') gameId: string,
    @requestBody({
    content: {
      'application/json':{
        schema: getModelSchemaRef(Action)
      }
    }
  }) action: Action) : Promise<ActionResponse> {
    //TODO: get playerId from token

    return this.actionService.resolveGameAction(action, 'playerId', gameId);
  }

  @post('/actions/player/{playerId}')
  async resolvePlayerAction(
    @param.path.string('playerId') playerId: string,
    @requestBody({
    content: {
      'application/json':{
        schema: getModelSchemaRef(Action)
      }
    }
  }) action: Action) : Promise<ActionResponse> {
    //TODO check player is who they say
    return this.actionService.resolvePlayerAction(action,playerId);
  }
}
