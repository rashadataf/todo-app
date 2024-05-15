import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(configService).toBeDefined();
  });

  it('should have all required configuration keys defined', () => {
    expect(configService.backendPort).toBeDefined();
    expect(configService.databaseHost).toBeDefined();
    expect(configService.databaseName).toBeDefined();
    expect(configService.databaseUser).toBeDefined();
    expect(configService.databasePassword).toBeDefined();
    expect(configService.databasePort).toBeDefined();
    expect(configService.nodeEnvironment).toBeDefined();
  });

  it('should ensure that all configuration values have correct types', () => {
    expect(typeof configService.backendPort).toBe('number');
    expect(typeof configService.databaseHost).toBe('string');
    expect(typeof configService.databaseName).toBe('string');
    expect(typeof configService.databaseUser).toBe('string');
    expect(typeof configService.databasePassword).toBe('string');
    expect(typeof configService.databasePort).toBe('number');
  });

});
