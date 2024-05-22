import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { UserCredentialsDto } from './user-credentials.dto';

export class RegisterDto extends UserCredentialsDto {
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    fullName: string;
}
