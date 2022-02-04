import {Model, model, property} from '@loopback/repository';

@model()
export class ActionResponse extends Model {
  @property({
    type: 'string',
    required: true,
  })
  action: string;

  @property({
    type: 'object',
  })
  payload?: object;

  @property({ type:'date' }) timestamp?: Date;


  constructor(data?: Partial<ActionResponse>) {
    super(data);
  }
}

export interface ActionResponseRelations {
  // describe navigational properties here
}

export type ActionResponseWithRelations = ActionResponse & ActionResponseRelations;
