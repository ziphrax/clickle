import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Action extends Model {
  @property({
    type: 'string',
    required: true,
  })
  action: string;

  @property({
    type: 'object',
  })
  payload?: {starter?: "water" | "fire" | "earth"};

  @property({
    type: 'date'
  })
  timestamp?: Date;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Action>) {
    super(data);
  }
}

export interface ActionRelations {
  // describe navigational properties here
}

export type ActionWithRelations = Action & ActionRelations;
