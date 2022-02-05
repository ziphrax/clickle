import {Entity, model, property} from '@loopback/repository';

@model()
export class UnitMember extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  unitId?: string;

  @property({type: 'string', required: true})
  playerId: string;

  @property({
    type: 'string',
    required: true,
  })
  unitName: string;

  @property({
    type: 'number',
    required: true,
  })
  unitLevel: number;

  @property({
    type: 'number',
    required: true,
  })
  unitMaxHP: number;

  @property({
    type: 'number',
    required: true,
  })
  unitCurrentHP: number;

  @property({
    type: 'number',
    required: true,
  })
  unitStrength: number;

  @property({
    type: 'number',
    required: true,
  })
  unitXP: number;

  @property({
    type: 'string',
    required: true,
  }) unitType: 'fire' | 'water' | 'earth' | 'air' | 'light' | 'dark' | 'neutral';


  constructor(data?: Partial<UnitMember>) {
    super(data);
  }
}

export interface UnitMemberRelations {
  // describe navigational properties here
}

export type UnitMemberWithRelations = UnitMember & UnitMemberRelations;
