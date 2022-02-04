import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {UnitBase} from '../models';
import {UnitBaseRepository} from '../repositories';

export class UnitBaseController {
  constructor(
    @repository(UnitBaseRepository)
    public unitBaseRepository : UnitBaseRepository,
  ) {}

  @post('/unit-bases')
  @response(200, {
    description: 'UnitBase model instance',
    content: {'application/json': {schema: getModelSchemaRef(UnitBase)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UnitBase, {
            title: 'NewUnitBase',
            exclude: ['unitId'],
          }),
        },
      },
    })
    unitBase: Omit<UnitBase, 'unitId'>,
  ): Promise<UnitBase> {
    return this.unitBaseRepository.create(unitBase);
  }

  @get('/unit-bases/count')
  @response(200, {
    description: 'UnitBase model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UnitBase) where?: Where<UnitBase>,
  ): Promise<Count> {
    return this.unitBaseRepository.count(where);
  }

  @get('/unit-bases')
  @response(200, {
    description: 'Array of UnitBase model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UnitBase, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UnitBase) filter?: Filter<UnitBase>,
  ): Promise<UnitBase[]> {
    return this.unitBaseRepository.find(filter);
  }

  @patch('/unit-bases')
  @response(200, {
    description: 'UnitBase PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UnitBase, {partial: true}),
        },
      },
    })
    unitBase: UnitBase,
    @param.where(UnitBase) where?: Where<UnitBase>,
  ): Promise<Count> {
    return this.unitBaseRepository.updateAll(unitBase, where);
  }

  @get('/unit-bases/{id}')
  @response(200, {
    description: 'UnitBase model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UnitBase, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(UnitBase, {exclude: 'where'}) filter?: FilterExcludingWhere<UnitBase>
  ): Promise<UnitBase> {
    return this.unitBaseRepository.findById(id, filter);
  }

  @patch('/unit-bases/{id}')
  @response(204, {
    description: 'UnitBase PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UnitBase, {partial: true}),
        },
      },
    })
    unitBase: UnitBase,
  ): Promise<void> {
    await this.unitBaseRepository.updateById(id, unitBase);
  }

  @put('/unit-bases/{id}')
  @response(204, {
    description: 'UnitBase PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() unitBase: UnitBase,
  ): Promise<void> {
    await this.unitBaseRepository.replaceById(id, unitBase);
  }

  @del('/unit-bases/{id}')
  @response(204, {
    description: 'UnitBase DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.unitBaseRepository.deleteById(id);
  }
}
