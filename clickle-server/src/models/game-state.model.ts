import {Entity, model, property} from '@loopback/repository';
import { PlayerState } from './player-state.model';

@model()
export class GameState extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  gameId?: string;

  @property(PlayerState)
  player1: PlayerState;

  @property(PlayerState)
  player2: PlayerState;

  @property({
    type: 'number',
    required: true,
  })
  currentTurn: number;

  @property() lastActionTime?: Date;

  @property() timeStarted?: Date;

  @property() coinReward?: number;


  constructor(data?: Partial<GameState>) {
    super(data);
  }
}

export interface GameStateRelations {
  // describe navigational properties here
}

export type GameStateWithRelations = GameState & GameStateRelations;
