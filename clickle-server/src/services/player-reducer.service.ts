import {injectable, BindingScope} from '@loopback/core';
import { Action, Player } from '../models';
import PLAYER_ACTIONS from '../data/actions.player.data';
import { repository } from '@loopback/repository';
import { UnitMemberRepository } from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class PlayerReducerService {
  constructor(@repository(UnitMemberRepository) public unitMemberRepository: UnitMemberRepository) {}

  async reduce(action: Action, player: Player): Promise<object>{
    console.log("ACTION: ", {action});
    switch(action.action){
      case PLAYER_ACTIONS.ACTION_PLAYER_DEV_TEST:
        return {};
      case PLAYER_ACTIONS.ACTION_PLAYER_PICK_STARTER:
        // TODO: load base unit from unit repository and instantiate an instance of the correct starter type
        const unitMember = await this.unitMemberRepository.create({
          playerId : player.playerId,
          unitName: action?.payload?.starter + " ( Starter )",
          unitType: action?.payload?.starter ?? "earth",
          unitLevel: 1,
          unitMaxHP: 10,
          unitCurrentHP: 10,
          unitStrength: 1,
          unitXP: 0
        });

        return { unitMember };
      default:
        throw new Error("Action not supported");
    }
  }
}
