import {Entity, model, property} from '@loopback/repository';

@model()
export class UnitBase extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  unitId?: string;

  @property({
    type: 'string',
    required: true,
  }) unitType: 'fire' | 'water' | 'earth' | 'air' | 'light' | 'dark' | 'neutral';

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


  constructor(data?: Partial<UnitBase>) {
    super(data);
  }
}

export interface UnitBaseRelations {
  // describe navigational properties here
}

export type UnitBaseWithRelations = UnitBase & UnitBaseRelations;
