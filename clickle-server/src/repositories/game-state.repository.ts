import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {GameState, GameStateRelations} from '../models';

export class GameStateRepository extends DefaultCrudRepository<
  GameState,
  typeof GameState.prototype.gameId,
  GameStateRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(GameState, dataSource);
  }
}
