import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserCredentialsDto {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    @IsDefined()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    password: string;
}
