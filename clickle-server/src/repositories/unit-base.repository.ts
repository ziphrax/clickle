import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {UnitBase, UnitBaseRelations} from '../models';

export class UnitBaseRepository extends DefaultCrudRepository<
  UnitBase,
  typeof UnitBase.prototype.unitId,
  UnitBaseRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(UnitBase, dataSource);
  }
}
