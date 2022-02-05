import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {UnitMember, UnitMemberRelations} from '../models';

export class UnitMemberRepository extends DefaultCrudRepository<
  UnitMember,
  typeof UnitMember.prototype.unitId,
  UnitMemberRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(UnitMember, dataSource);
  }
}
