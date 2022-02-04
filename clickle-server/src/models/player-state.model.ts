import {Model, model, property} from '@loopback/repository';
import { UnitMember } from './unit-member.model';

@model()
export class PlayerState extends Model {
  @property({
    type: 'string',
    required: true,
  })
  playerId: string;

  @property({
    type: 'date',
  })
  lastActionTime?: string;

  @property({
    type: 'number',
  })
  currentFieldedTeamMember?: number;

  @property.array(UnitMember)
  teamMembers?: UnitMember[];


  constructor(data?: Partial<PlayerState>) {
    super(data);
  }
}

export interface PlayerStateRelations {
  // describe navigational properties here
}

export type PlayerStateWithRelations = PlayerState & PlayerStateRelations;
