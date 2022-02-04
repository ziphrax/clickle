import {Model, model, property} from '@loopback/repository';

@model()
export class LoginResponse extends Model {
  @property({
    type: 'string',
    required: true,
  })
  playerId: string;

  @property({
    type: 'string',
    required: true,
  })
  playerEmail: string;

  @property({
    type: 'string',
    required: true,
  })
  token: string;


  constructor(data?: Partial<LoginResponse>) {
    super(data);
  }
}

export interface LoginResponseRelations {
  // describe navigational properties here
}

export type LoginResponseWithRelations = LoginResponse & LoginResponseRelations;
