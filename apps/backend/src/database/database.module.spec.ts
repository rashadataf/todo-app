import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DatabaseModule } from './database.module';
import { ConfigService } from '../config/config.service';
import { DataSource } from 'typeorm';
import { NodeEnvironment } from '@workspace/shared';

class MockConfigService {
    databaseName = process.env.TEST_DATABASE_NAME;
    databasePort = process.env.TEST_DATABASE_PORT;
    databaseHost = process.env.TEST_DATABASE_HOST;
    databaseUser = process.env.TEST_DATABASE_USER;
    databasePassword = process.env.TEST_DATABASE_PASSWORD;
    nodeEnvironment = NodeEnvironment.DEVELOPMENT;
}

describe('DatabaseModule', () => {
    let module: TestingModule;
    let dataSource: DataSource;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [
                DatabaseModule,
            ],
        })
            .overrideProvider(ConfigService)
            .useClass(MockConfigService)
            .compile();

        dataSource = module.get<DataSource>(getDataSourceToken());

        // Initialize DataSource only if it's not already initialized
        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }
    });

    it('should connect to the database', async () => {
        expect(dataSource.isInitialized).toBeTruthy();
    });

    afterAll(async () => {
        if (dataSource.isInitialized) {
            await dataSource.destroy();
        }
    });
});
