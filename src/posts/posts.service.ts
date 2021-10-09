import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post } from '@prisma/client';
import { NewPost, UpdatePost } from 'src/graphql';
import { PostNotFoundException } from '../exceptions/postNotFound.exception';
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
        });

        if (!post) throw new PostNotFoundException(parseInt(id));

        return post;
    }

    // Get multiple posts
    async posts(): Promise<Post[]> {
        return this.prisma.post.findMany({});
    }

    // Create a post
    async createPost(input: NewPost): Promise<Post> {
        return this.prisma.post.create({
            data: input,
        });
    }

    // Update a post
    async updatePost(params: UpdatePost): Promise<Post> {
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
