import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { NewUser } from 'src/graphql';

@Resolver('User')
export class UserResolvers {
    constructor(private readonly userService: UsersService) {}

    @Query('users')
    async posts() {
        return this.userService.users();
    }

    @Query('user')
    async post(@Args('id') args: string) {
        return this.userService.user(args);
    }

    @Mutation('createUser')
    async create(@Args('input') args: NewUser) {
        return this.userService.createUser(args);
    }

    @Mutation('deleteUser')
    async delete(@Args('id') args: string) {
        return this.userService.deleteUser(args);
    }
}
