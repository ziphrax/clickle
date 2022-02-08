import {authenticate} from '@loopback/authentication';
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
import {UnitMember} from '../models';
import {UnitMemberRepository} from '../repositories';

@authenticate('jwt')
export class UnitMemberController {
  constructor(
    @repository(UnitMemberRepository)
    public unitMemberRepository: UnitMemberRepository,
  ) {}

  @post('/unit-members')
  @response(200, {
    description: 'UnitMember model instance',
    content: {'application/json': {schema: getModelSchemaRef(UnitMember)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UnitMember, {
            title: 'NewUnitMember',
            exclude: ['unitId'],
          }),
        },
      },
    })
    unitMember: Omit<UnitMember, 'unitId'>,
  ): Promise<UnitMember> {
    return this.unitMemberRepository.create(unitMember);
  }

  @get('/unit-members/count')
  @response(200, {
    description: 'UnitMember model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UnitMember) where?: Where<UnitMember>,
  ): Promise<Count> {
    return this.unitMemberRepository.count(where);
  }

  @get('/unit-members')
  @response(200, {
    description: 'Array of UnitMember model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UnitMember, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UnitMember) filter?: Filter<UnitMember>,
  ): Promise<UnitMember[]> {
    return this.unitMemberRepository.find(filter);
  }

  @patch('/unit-members')
  @response(200, {
    description: 'UnitMember PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UnitMember, {partial: true}),
        },
      },
    })
    unitMember: UnitMember,
    @param.where(UnitMember) where?: Where<UnitMember>,
  ): Promise<Count> {
    return this.unitMemberRepository.updateAll(unitMember, where);
  }

  @get('/unit-members/{id}')
  @response(200, {
    description: 'UnitMember model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UnitMember, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(UnitMember, {exclude: 'where'})
    filter?: FilterExcludingWhere<UnitMember>,
  ): Promise<UnitMember> {
    return this.unitMemberRepository.findById(id, filter);
  }

  @patch('/unit-members/{id}')
  @response(204, {
    description: 'UnitMember PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UnitMember, {partial: true}),
        },
      },
    })
    unitMember: UnitMember,
  ): Promise<void> {
    await this.unitMemberRepository.updateById(id, unitMember);
  }

  @put('/unit-members/{id}')
  @response(204, {
    description: 'UnitMember PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() unitMember: UnitMember,
  ): Promise<void> {
    await this.unitMemberRepository.replaceById(id, unitMember);
  }

  @del('/unit-members/{id}')
  @response(204, {
    description: 'UnitMember DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.unitMemberRepository.deleteById(id);
  }
}
