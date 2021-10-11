import { IsNotEmpty, IsString } from 'class-validator';
import { NewUser } from '../../graphql';

export class createUserDTO extends NewUser {
    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly name: string;
}
