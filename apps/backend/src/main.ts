import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  console.log('configService: ', configService.databaseHost);

  await app.listen(configService.backendPort);
  console.info('the backend is up and running on port: ', configService.backendPort)
}
bootstrap();
