import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { ConfigService } from '../src/config/config.service';
import { NodeEnvironment } from '@workspace/shared';
import * as request from 'supertest';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

class MockConfigService {
  databaseName = process.env.TEST_DATABASE_NAME;
  databasePort = process.env.TEST_DATABASE_PORT;
  databaseHost = process.env.TEST_DATABASE_HOST;
  databaseUser = process.env.TEST_DATABASE_USER;
  databasePassword = process.env.TEST_DATABASE_PASSWORD;
  nodeEnvironment = NodeEnvironment.DEVELOPMENT;
}

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ConfigService)
      .useClass(MockConfigService)
      .compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Server is Running!');
  });

  afterAll(async () => {
    await app.close();
  });
});
