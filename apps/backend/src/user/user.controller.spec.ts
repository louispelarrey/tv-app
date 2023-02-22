import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUser = {
    id: 1,
    username: 'testuser',
    password: 'password',
    email: 'testuser@example.com',
    roles: [],
    followedShows: [],
    watchedShows: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findAll: jest.fn(() => [mockUser]),
            findOne: jest.fn(() => mockUser),
            createUser: jest.fn(() => mockUser),
            updateUser: jest.fn(() => mockUser),
            deleteUser: jest.fn(() => mockUser),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [mockUser];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockUser);

      expect(await controller.findOne(1)).toBe(mockUser);
    });
  });

  describe('createUser', () => {
    it('should create and return a user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        password: 'password',
        email: 'testuser@example.com',
      };
      jest.spyOn(service, 'createUser').mockResolvedValue(mockUser);

      expect(await controller.createUser(createUserDto)).toBe(mockUser);
    });
  });

  describe('updateUser', () => {
    it('should update and return a user', async () => {
      const updateUserDto: UpdateUserDto = {
        username: 'newuser',
        password: 'newpassword',
        email: 'newuser@example.com',
      };
      jest.spyOn(service, 'updateUser').mockResolvedValue(mockUser);

      expect(await controller.updateUser(1, updateUserDto)).toBe(mockUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete and return a user', async () => {
      jest.spyOn(service, 'deleteUser').mockResolvedValue(mockUser);

      expect(await controller.deleteUser(1)).toBe(mockUser);
    });
  });
});
