import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';
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
import {Player} from '../models';
import {PlayerRepository} from '../repositories';
import {SecurityBindings, UserProfile, securityId} from '@loopback/security';
import { UserRepository } from '@loopback/authentication-jwt';

//leaving this in as the idea is maybe can have multiple characters for a user

@authenticate('jwt')
export class PlayerController {
  constructor(
    @repository(PlayerRepository)
    public playerRepository : PlayerRepository,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @repository(UserRepository) protected userRepository: UserRepository,
  ) {}

  @post('/players')
  @response(200, {
    description: 'Player model instance',
    content: {'application/json': {schema: getModelSchemaRef(Player)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {
            title: 'NewPlayer',
            exclude: ['playerId',"playerUserId","coinTotal","createdDate","lastLoginDate"],
          }),
        },
      },
    })
    player: Omit<Player, 'playerId'>,
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<Player> {
    player.playerUserId = currentUserProfile[securityId];
    player.coinTotal = parseInt(process.env.STARTING_COIN_TOTAL ?? "0");
    player.createdDate = new Date();
    player.lastLoginDate = new Date();
    return this.playerRepository.create(player);
  }

  @get('/players/count')
  @response(200, {
    description: 'Player model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Player) where?: Where<Player>,
  ): Promise<Count> {
    return this.playerRepository.count(where);
  }

  @get('/players')
  @response(200, {
    description: 'Array of Player model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Player, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Player) filter?: Filter<Player>,
  ): Promise<Player[]> {
    filter = {...filter, where: {...filter?.where, playerUserId: this.user[securityId]}};
    return this.playerRepository.find(filter);
  }

  @patch('/players')
  @response(200, {
    description: 'Player PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {partial: true}),
        },
      },
    })
    player: Player,
    @param.where(Player) where?: Where<Player>,
  ): Promise<Count> {
    return this.playerRepository.updateAll(player, where);
  }

  @get('/players/{id}')
  @response(200, {
    description: 'Player model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Player, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Player, {exclude: 'where'}) filter?: FilterExcludingWhere<Player>
  ): Promise<Player> {
    return this.playerRepository.findById(id, filter);
  }

  @patch('/players/{id}')
  @response(204, {
    description: 'Player PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {partial: true}),
        },
      },
    })
    player: Player,
  ): Promise<void> {
    await this.playerRepository.updateById(id, player);
  }

  @put('/players/{id}')
  @response(204, {
    description: 'Player PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() player: Player,
  ): Promise<void> {
    await this.playerRepository.replaceById(id, player);
  }

  @del('/players/{id}')
  @response(204, {
    description: 'Player DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.playerRepository.deleteById(id);
  }
}
