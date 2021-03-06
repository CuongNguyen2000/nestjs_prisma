import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from './prisma/prisma.module';
import { PostsService } from './posts/posts.service';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        GraphQLModule.forRoot({
            typePaths: ['./**/*.graphql'],
        }),
        PrismaModule,
        PostsModule,
        UsersModule,
    ],
    controllers: [],
    providers: [PostsService],
})
export class AppModule {}
