import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodeEnvironment } from '@workspace/shared';
import { ConfigService } from '../config/config.service';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            extraProviders: [ConfigService],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                type: 'postgres',
                host: config.databaseHost,
                port: config.databasePort,
                username: config.databaseUser,
                password: config.databasePassword,
                database: config.databaseName,
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: config.nodeEnvironment !== NodeEnvironment.PRODUCTION,
                migrationsRun: false,
                migrations: [__dirname + '/migrations/**/*{.ts,.js}']
            }),
        }),
    ],
})
export class DatabaseModule { }
