import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { UserService } from "./user.service";

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  const mockUserRepository = () => ({
    findOne: jest.fn(),
    find: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useFactory: mockUserRepository },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const user = new User();
      user.id = 1;
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user);

      const result = await userService.findOne(user.id);

      expect(result).toEqual(user);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: user.id } });
    });
  });

  describe('findByEmail', () => {
    it('should return a user', async () => {
      const user = new User();
      user.email = 'test@example.com';
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user);

      const result = await userService.findByEmail(user.email);

      expect(result).toEqual(user);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { email: user.email } });
    });
  });

  describe('findByIdentifier', () => {
    it('should return a user by email', async () => {
      const user = new User();
      user.email = 'test@example.com';
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user);

      const result = await userService.findByIdentifier(user.email);

      expect(result).toEqual(user);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: [{ email: user.email }, { username: user.email }] });
    });

    it('should return a user by username', async () => {
      const user = new User();
      user.username = 'testuser';
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user);


      const result = await userService.findByIdentifier(user.username);

      expect(result).toEqual(user);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: [{ email: user.username }, { username: user.username }] });
    });

    it('should return undefined if user not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);

      const result = await userService.findByIdentifier('test@example.com');

      expect(result).toEqual(undefined);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: [{ email: 'test@example.com' }, { username: 'test@example.com' }] });
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [new User(), new User(), new User()];
      jest.spyOn(userRepository, 'find').mockResolvedValueOnce(users);
      const result = await userService.findAll();

      expect(result).toEqual(users);
      expect(userRepository.find).toHaveBeenCalled();
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpass',
      };

      const user = new User();
      user.username = createUserDto.username;
      user.email = createUserDto.email;
      user.password = createUserDto.password;
      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(user);

      const result = await userService.createUser(createUserDto);

      expect(result).toEqual(user);
      expect(userRepository.save).toHaveBeenCalledWith(user);
    });
  });


});
