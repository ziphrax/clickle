import {Entity, model, property} from '@loopback/repository';

@model()
export class GameState extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  gameId?: string;

  @property({
    type: 'string',
    required: true,
  })
  playerId: string;

  @property({
    type: 'string',
    required: true,
  })
  player1Id: string;

  @property({
    type: 'string',
    required: true,
  })
  player2Id: string;

  @property({
    type: 'number',
    required: true,
  })
  currentTurn: number;


  constructor(data?: Partial<GameState>) {
    super(data);
  }
}

export interface GameStateRelations {
  // describe navigational properties here
}

export type GameStateWithRelations = GameState & GameStateRelations;
