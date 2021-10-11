import { IsNotEmpty, IsString } from 'class-validator';
import { NewPost } from '../../graphql';

export class createPostDTO extends NewPost {
    @IsString()
    @IsNotEmpty()
    readonly author: string;

    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    readonly content: string;
}
