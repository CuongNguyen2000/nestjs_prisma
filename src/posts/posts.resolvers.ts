import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { createPostDTO } from './dto/createPost.dto';
import { updatePostDTO } from './dto/updatePost.dto';

@Resolver('Post')
export class PostResolvers {
    constructor(private readonly postService: PostsService) {}

    @Query('posts')
    async posts() {
        return this.postService.posts();
    }

    @Query('post')
    async post(@Args('id') args: string) {
        return this.postService.post(args);
    }

    @Mutation('createPost')
    async create(@Args('input') args: createPostDTO) {
        return this.postService.createPost(args);
    }

    @Mutation('updatePost')
    async update(@Args('input') args: updatePostDTO) {
        return this.postService.updatePost(args);
    }

    @Mutation('deletePost')
    async delete(@Args('id') args: string) {
        return this.postService.deletePost(args);
    }
}
