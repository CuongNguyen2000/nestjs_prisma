import { IsNotEmpty, IsString } from 'class-validator';
import { UpdatePost } from '../../graphql';

export class updatePostDTO extends UpdatePost {
    @IsString()
    id: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}
