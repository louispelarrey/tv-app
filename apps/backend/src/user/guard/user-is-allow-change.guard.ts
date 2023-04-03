import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from '../../role/enums/role.enum';
import { User } from '../user.entity';
import { UserService } from '../user.service';

/**
 * Guard to check if the user is allowed to change the user - it checks if the user is an admin or the owner of the user
 */
@Injectable()
export class UserIsAllowedChange implements CanActivate {
  constructor(
    private readonly userService: UserService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, params } = context.switchToHttp().getRequest();
    let currentUser: User

    try {
      currentUser = await this.userService.findOne(user.sub);
    } catch (error) {
      console.error('Encoutered error while trying to find user', error, user)
      return false;
    }

    const isAdmin = currentUser.roles.includes(Role.Admin);
    const isOwner = currentUser.id == params.id;

    return isAdmin || isOwner;
  }
}
