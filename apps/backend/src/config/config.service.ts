import { Injectable } from '@nestjs/common';
import { ConfigKey, NodeEnvironment } from '@workspace/shared';

@Injectable()
export class ConfigService {
    private readonly envConfig: { [key in ConfigKey]?: string };

    constructor() {
        this.envConfig = {
            [ConfigKey.BACKEND_PORT]: process.env.BACKEND_PORT,
            [ConfigKey.DATABASE_HOST]: process.env.DATABASE_HOST,
            [ConfigKey.DATABASE_NAME]: process.env.DATABASE_NAME,
            [ConfigKey.DATABASE_USER]: process.env.DATABASE_USER,
            [ConfigKey.DATABASE_PASSWORD]: process.env.DATABASE_PASSWORD,
            [ConfigKey.DATABASE_PORT]: process.env.DATABASE_PORT,
            [ConfigKey.NODE_ENV]: process.env.NODE_ENV,
            [ConfigKey.JWT_SECRET]: process.env.JWT_SECRET,
            [ConfigKey.JWT_EXPIRATION]: process.env.JWT_EXPIRATION,
        };
    }

    private get(key: ConfigKey): string {
        return this.envConfig[key];
    }

    get backendPort(): number {
        return Number(this.get(ConfigKey.BACKEND_PORT));
    }

    get databaseHost(): string {
        return this.get(ConfigKey.DATABASE_HOST);
    }

    get databaseName(): string {
        return this.get(ConfigKey.DATABASE_NAME);
    }

    get databaseUser(): string {
        return this.get(ConfigKey.DATABASE_USER);
    }

    get databasePassword(): string {
        return this.get(ConfigKey.DATABASE_PASSWORD);
    }

    get databasePort(): number {
        return Number(this.get(ConfigKey.DATABASE_PORT));
    }

    get nodeEnvironment(): NodeEnvironment {
        return this.get(ConfigKey.NODE_ENV) as NodeEnvironment;
    }

    get jwtSecret(): string {
        return this.get(ConfigKey.JWT_SECRET);
    }

    get jwtExpiration(): string {
        return this.get(ConfigKey.JWT_EXPIRATION);
    }
}
