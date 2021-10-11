import { Module } from '@nestjs/common';
import { UserResolvers } from './users.resolvers';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    providers: [UserResolvers, UsersService, PrismaService],
})
export class UsersModule {}
