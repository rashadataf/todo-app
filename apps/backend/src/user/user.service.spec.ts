import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/crete-user.dto';

describe('UserService', () => {
    let service: UserService;
    let repository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        repository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a new user', async () => {
        const createUserDto: CreateUserDto = { email: 'test@example.com', fullName: 'Test User', password: 'password' };
        const user: User = { id: 1, ...createUserDto, createdAt: new Date(), updatedAt: new Date() } as User;

        jest.spyOn(repository, 'create').mockReturnValue(user);
        jest.spyOn(repository, 'save').mockResolvedValue(user);

        expect(await service.create(createUserDto)).toEqual(user);
    });

    it('should find a user by email', async () => {
        const user: User = { id: 1, email: 'test@example.com', fullName: 'Test User', password: 'password', createdAt: new Date(), updatedAt: new Date() } as User;

        jest.spyOn(repository, 'findOne').mockResolvedValue(user);

        expect(await service.findOneByEmail('test@example.com')).toEqual(user);
    });
});
