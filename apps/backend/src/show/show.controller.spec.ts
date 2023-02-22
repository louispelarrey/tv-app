import { Test, TestingModule } from '@nestjs/testing';
import { ShowController } from './show.controller';
import { ShowService } from './show.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Show } from './show.entity';
import { Celebrity } from '../celebrity/celebrity.entity';
import { Season } from '../season/season.entity';
import { User } from '../user/user.entity';
import { ShowDto } from './dto/show.dto';

describe('ShowController', () => {
  let controller: ShowController;
  let service: ShowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShowController],
      providers: [
        ShowService,
        {
          provide: getRepositoryToken(Show),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Celebrity),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Season),
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ShowController>(ShowController);
    service = module.get<ShowService>(ShowService);
  });

  describe('findAll', () => {
    it('should return an array of shows', async () => {
      const result: Show[] = [{ id: 1, name: 'Show 1', description: 'Description 1', seasons: [], celebrities: [], followedBy: [], watchedBy: [] }];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('createShow', () => {
    it('should create a show', async () => {
      const showData : ShowDto = {
        name: 'New Show',
        description: 'New Show Description',
        id: 1
      };
      const createdShow: Show = {
        id: 1, ...showData,
        seasons: [],
        celebrities: [],
        followedBy: [],
        watchedBy: []
      };
      jest.spyOn(service, 'create').mockResolvedValue(createdShow);

      expect(await controller.createShow(showData)).toBe(createdShow);
    });
  });

  describe('updateShow', () => {
    it('should update a show', async () => {
      const showData: ShowDto = {
        name: 'Updated Show', description: 'Updated Show Description',
        id: 0
      };
      const updatedShow: Show = {
        id: 1, ...showData,
        seasons: [],
        celebrities: [],
        followedBy: [],
        watchedBy: []
      };
      jest.spyOn(service, 'update').mockResolvedValue(updatedShow);

      expect(await controller.updateShow(1, showData)).toBe(updatedShow);
    });
  });

  describe('deleteShow', () => {
    it('should delete a show', async () => {
      const deletedShow: Show = {
        id: 1, name: 'Deleted Show', description: 'Deleted Show Description',
        seasons: [],
        celebrities: [],
        followedBy: [],
        watchedBy: []
      };
      jest.spyOn(service, 'delete').mockResolvedValue(deletedShow);

      expect(await controller.deleteShow(1)).toBe(deletedShow);
    });
  });
});
