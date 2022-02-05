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
import {GameState} from '../models';
import {GameStateRepository} from '../repositories';

import {authenticate} from '@loopback/authentication';

@authenticate('jwt')
export class GameStateController {
  constructor(
    @repository(GameStateRepository)
    public gameStateRepository : GameStateRepository,
  ) {}

  @post('/game-states')
  @response(200, {
    description: 'GameState model instance',
    content: {'application/json': {schema: getModelSchemaRef(GameState)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GameState, {
            title: 'NewGameState',
            exclude: ['gameId'],
          }),
        },
      },
    })
    gameState: Omit<GameState, 'gameId'>,
  ): Promise<GameState> {
    return this.gameStateRepository.create(gameState);
  }

  @get('/game-states/count')
  @response(200, {
    description: 'GameState model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(GameState) where?: Where<GameState>,
  ): Promise<Count> {
    return this.gameStateRepository.count(where);
  }

  @get('/game-states')
  @response(200, {
    description: 'Array of GameState model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(GameState, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(GameState) filter?: Filter<GameState>,
  ): Promise<GameState[]> {
    return this.gameStateRepository.find(filter);
  }

  @patch('/game-states')
  @response(200, {
    description: 'GameState PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GameState, {partial: true}),
        },
      },
    })
    gameState: GameState,
    @param.where(GameState) where?: Where<GameState>,
  ): Promise<Count> {
    return this.gameStateRepository.updateAll(gameState, where);
  }

  @get('/game-states/{id}')
  @response(200, {
    description: 'GameState model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(GameState, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(GameState, {exclude: 'where'}) filter?: FilterExcludingWhere<GameState>
  ): Promise<GameState> {
    return this.gameStateRepository.findById(id, filter);
  }

  @patch('/game-states/{id}')
  @response(204, {
    description: 'GameState PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GameState, {partial: true}),
        },
      },
    })
    gameState: GameState,
  ): Promise<void> {
    await this.gameStateRepository.updateById(id, gameState);
  }

  @put('/game-states/{id}')
  @response(204, {
    description: 'GameState PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() gameState: GameState,
  ): Promise<void> {
    await this.gameStateRepository.replaceById(id, gameState);
  }

  @del('/game-states/{id}')
  @response(204, {
    description: 'GameState DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.gameStateRepository.deleteById(id);
  }
}
