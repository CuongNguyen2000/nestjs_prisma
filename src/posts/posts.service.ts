import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post } from '@prisma/client';
import { createPostDTO } from './dto/createPost.dto';
import { updatePostDTO } from './dto/updatePost.dto';
import { PostNotFoundException } from '../exceptions/postNotFound.exception';
import { UserNotFoundException } from '../exceptions/userNotFound.exception';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaError } from '../utils/prismaError';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}

    // Get a single post
    async post(id: string): Promise<Post | null> {
        const post = await this.prisma.post.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                author: true, // Return all fields
            },
        });

        if (!post) throw new PostNotFoundException(parseInt(id));

        return post;
    }

    // Get multiple posts
    async posts(): Promise<Post[]> {
        return this.prisma.post.findMany({
            include: {
                author: true, // Return all fields
            },
        });
    }

    // Create a post
    async createPost(input: createPostDTO): Promise<Post> {
        const userExist = await this.prisma.user.findUnique({
            where: {
                id: parseInt(input.author),
            },
        });

        if (!userExist) throw new UserNotFoundException(parseInt(input.author));

        const newPost = await this.prisma.post.create({
            data: {
                ...input,
                author: {
                    connect: {
                        id: userExist.id,
                    },
                },
            },
            include: {
                author: true, // Return all fields
            },
        });
        return newPost;
    }

    // Update a post
    async updatePost(params: updatePostDTO): Promise<Post> {
        const { id, title, content } = params;
        try {
            const updatePost = await this.prisma.post.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    ...(title && { title }),
                    ...(content && { content }),
                },
                include: {
                    author: true, // Return all fields
                },
            });

            return updatePost;
        } catch (error) {
            if (
                error instanceof PrismaClientKnownRequestError &&
                error.code === PrismaError.RecordDoesNotExist
            ) {
                throw new PostNotFoundException(parseInt(id));
            }
            throw error;
        }
    }

    // delete a post
    async deletePost(id: string): Promise<Post> {
        // const post = await this.prisma.post.findUnique({
        //     where: {
        //         id: parseInt(id),
        //     },
        // });

        // if (!post) {
        //     throw new PostNotFoundException(parseInt(id));
        // }

        try {
            const deletePost = await this.prisma.post.delete({
                where: {
                    id: parseInt(id),
                },
                include: {
                    author: true, // Return all fields
                },
            });
            return deletePost;
        } catch (error) {
            if (
                error instanceof PrismaClientKnownRequestError &&
                error.code === PrismaError.RecordDoesNotExist
            ) {
                throw new PostNotFoundException(parseInt(id));
            }
            throw error;
        }
    }
}
