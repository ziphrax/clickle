import { User } from '@loopback/authentication-jwt';
import { model, property} from '@loopback/repository';

@model()
export class Player extends User {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  playerId?: string;

  @property({
    type: 'string',
    required: true,
  })
  playerUserId: string;

  @property({
    type: 'string',
    required: true,
  })
  playerName: string;

  @property({
    type: 'string',
    required: true,
  })
  playerEmail: string;

  @property({
    type: 'date',
    required: true,
  })
  playerDOB: string;

  @property({
    type: 'number',
    required: true,
  })
  coinTotal: number;

  @property({
    type: 'date',
    required: true,
  })
  createdDate: string;

  @property({
    type: 'date',
  })
  lastLoginDate?: string;

  constructor(data?: Partial<Player>) {
    super(data);
  }
}

export interface PlayerRelations {
  // describe navigational properties here
}

export type PlayerWithRelations = Player & PlayerRelations;
