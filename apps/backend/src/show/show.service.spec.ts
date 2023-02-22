import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { ShowDto } from './dto/show.dto';
import { Show } from './show.entity';
import { ShowService } from './show.service';

describe('ShowService', () => {
  let service: ShowService;
  let showRepository: Repository<Show>;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShowService,
        {
          provide: getRepositoryToken(Show),
          useClass: class MockRepository extends Repository<Show> { },
        },
        {
          provide: getRepositoryToken(User),
          useClass: class MockRepository extends Repository<User> { },
        },
      ],
    }).compile();

    service = module.get<ShowService>(ShowService);
    showRepository = module.get<Repository<Show>>(getRepositoryToken(Show));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('findAll', () => {
    it('should return an array of shows', async () => {
      const show = new Show();
      jest.spyOn(showRepository, 'find').mockResolvedValueOnce([show]);

      const result = await service.findAll();

      expect(result).toEqual([show]);
    });
  });

  describe('findAllFollowed', () => {
    it('should return an array of shows followed by a user', async () => {
      const show = new Show();
      const user = new User();
      user.id = 1;
      show.followedBy = [user];
      jest.spyOn(showRepository, 'find').mockResolvedValueOnce([show]);
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(user);
      const result = await service.findAllFollowed(user.id);

      expect(result).toEqual([show]);
    });
  });


  describe('findById', () => {
    it('should return a show by its ID', async () => {
      const show = new Show();
      jest.spyOn(showRepository, 'findOne').mockResolvedValueOnce(show);

      const result = await service.findById(show.id);

      expect(result).toEqual(show);
    });
  });

  describe('create', () => {
    it('should create a new show', async () => {
      const showDto: ShowDto = {
        name: 'Test Show', description: 'Test Description',
        id: 1
      };
      const show = new Show();
      show.name = showDto.name;
      show.description = showDto.description;
      jest.spyOn(showRepository, 'save').mockResolvedValueOnce(show);

      const result = await service.create(showDto);

      expect(result).toEqual(show);
    });
  });

  describe('update', () => {
    it('should update a show by its ID', async () => {
      const showDto: ShowDto = {
        name: 'Updated Show', description: 'Updated Description',
        id: 1
      };
      const show = new Show();
      show.name = 'Original Show';
      show.description = 'Original Description';
      jest.spyOn(showRepository, 'findOne').mockResolvedValueOnce(show);
      jest.spyOn(showRepository, 'save').mockResolvedValueOnce(show);

      const result = await service.update(show.id, showDto);

      expect(result.name).toEqual(showDto.name);
      expect(result.description).toEqual(showDto.description);
    });
  });

  describe('delete', () => {
    it('should delete a show by its ID', async () => {
      const mockShow: Show = {
        id: 1,
        name: 'Mock Show',
        description: 'This is a mock show',
        seasons: [],
        celebrities: [],
        followedBy: [],
        watchedBy: []
      };

      jest.spyOn(showRepository, 'findOne').mockResolvedValueOnce(mockShow);
      jest.spyOn(showRepository, 'save').mockResolvedValueOnce(mockShow);
      jest.spyOn(showRepository, 'remove').mockResolvedValueOnce(mockShow);

      await service.create(mockShow);
      const result = await service.delete(mockShow.id);

      expect(result).toEqual(mockShow);
    });

    it('should throw an error if the show does not exist', async () => {
      const showId = 1;
      jest.spyOn(showRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.delete(showId)).rejects.toThrow();
    });
  });
});
