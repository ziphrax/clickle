import { service } from "@loopback/core";
import { get, getModelSchemaRef, param, post, requestBody } from "@loopback/rest";
import { ActionResponse } from "../models/action-response.model";
import { Action } from "../models/action.model";
import {ActionService} from '../services'

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

  @post('/action/game/{gameId}')
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

  @post('/action/player')
  async resolvePlayerAction(@requestBody({
    content: {
      'application/json':{
        schema: getModelSchemaRef(Action)
      }
    }
  }) action: Action) : Promise<ActionResponse> {
    return this.actionService.resolvePlayerAction(action,);
  }
}
