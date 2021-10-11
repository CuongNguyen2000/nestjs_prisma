import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { NewUser } from 'src/graphql';
import { UserNotFoundException } from '../exceptions/userNotFound.exception';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaError } from '../utils/prismaError';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    // Create a new
    async createUser(input: NewUser): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: input.email,
            },
        });

        if (user) {
            throw new HttpException('User is already exist', HttpStatus.BAD_REQUEST)
        }

        const newUser = await this.prisma.user.create({
            data: input,
            include: {
                posts: true,
            },
        });
        return newUser;
    }

    // Get a single user
    async user(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                posts: true,
            },
        });

        if (!user) throw new UserNotFoundException(parseInt(id));

        return user;
    }


    // Get multiple users
    async users(): Promise<User[] | null> {
        return this.prisma.user.findMany({
            include: {
                posts: true,
            },
        });
    }

    // delete an user
    async deleteUser(id: string): Promise<User> {

        const user = await this.prisma.user.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                posts: true,
            },
        });

        if (!user) throw new UserNotFoundException(parseInt(id));

        const deleteUser = this.prisma.user.delete({
            where: {
                id: parseInt(id),
            },
        });

        const deletePosts = this.prisma.post.deleteMany({
            where: {
                authorId: parseInt(id),
            },
        })
        
        await this.prisma.$transaction([deletePosts, deleteUser])

        return user;

    }
}
