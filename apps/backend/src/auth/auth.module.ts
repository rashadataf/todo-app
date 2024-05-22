import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { ConfigService } from '../config/config.service';

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            extraProviders: [ConfigService],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.jwtSecret,
                signOptions: {
                    expiresIn: configService.jwtExpiration
                },
            }),
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule { }
