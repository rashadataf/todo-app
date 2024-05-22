import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import { User } from 'src/user/user.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<User> {
        const user = await this.userService.findOneByEmail(email);
        if (user && bcrypt.compareSync(pass, user.password)) {
            delete user.password;
            return user;
        }
        return null;
    }

    login(user: User) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(user: RegisterDto) {
        const hashedPassword = bcrypt.hashSync(user.password, 10);
        return await this.userService.create({ ...user, password: hashedPassword });
    }
}
