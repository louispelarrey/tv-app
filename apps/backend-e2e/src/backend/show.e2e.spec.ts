import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { Repository } from 'typeorm';
import { AppModule } from '@tv-app/backend/src/app/app.module';
import { User } from '@tv-app/backend/src/user/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from '@tv-app/backend/src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@tv-app/backend/src/role/enums/role.enum';
import { Show } from '@tv-app/backend/src/show/show.entity';
import { ShowDto } from '@tv-app/backend/src/show/dto/show.dto';

describe('ShowController (e2e)', () => {
  let app: INestApplication;
  let showRepository: Repository<Show>;
  let userToken: string;
  let userId: number;
  let showId: number;

  const testUser: CreateUserDto = {
    username: 'testuser22',
    email: 'testuser22@example.com',
    password: 'testpassword',
  };

  const testShow: ShowDto = {
    name: 'testshow',
    description: 'testshow',
    id: 1
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const jwtService = moduleFixture.get<JwtService>(JwtService);
    userToken = jwtService.sign({ username: testUser.username, sub: 1, roles: [Role.User] });

    showRepository = moduleFixture.get<Repository<Show>>(getRepositoryToken(Show));
  });

  afterAll(async () => {
    await app.close();
  });

  it('/show (POST) - create show', async () => {
    const response = await request(app.getHttpServer())
      .post('/show')
      .set('Authorization', `Bearer ${userToken}`)
      .send(testShow)
      .expect(201)

    const showInDatabase = await showRepository.find()

    showId = response.body.id;
    expect(showInDatabase?.length).toBe(1)
  });

  describe('/show/:id (GET) - get show by id', () => {
    it('should return a show by id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/show/${showId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.id).toEqual(showId);
      expect(response.body.name).toEqual(testShow.name);
      expect(response.body.description).toEqual(testShow.description);
    });

    it('should return an error if show does not exist', async () => {
      const nonExistentId = 'non-existent-id';
      await request(app.getHttpServer())
        .get(`/show/${nonExistentId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(500);
    });
  });


  describe('/show/:id (PUT) - update show', () => {
    it('should update an existing show', async () => {
      const updateData: ShowDto = {
        id: 1,
        name: 'Test show 2',
        description: 'Ceci est une description mise à jour',
      };

      await request(app.getHttpServer())
        .put(`/show/${showId}`)
        .send(updateData)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      const updatedShow = await showRepository.findOne({ where: { id: showId } });
      expect(updatedShow.name).toEqual(updateData.name);
      expect(updatedShow.description).toEqual(updateData.description);
    });
  });

  describe('/show/:id (DELETE) - delete show', () => {
    it('should correctly remove an existing show', async () => {
      const showInDatabase = await showRepository.find()

      expect(showInDatabase?.length).toBe(1)

      const res = await request(app.getHttpServer())
        .delete(`/show/${showId}`)
        .set('Authorization', `Bearer ${userToken}`) // Add the Authorization header here

      expect(res.status).toBe(200)

      const showInDatabaseAfterCall = await showRepository.find()

      expect(showInDatabaseAfterCall.length).toBe(0)
    });

    it('should return an error if no show exists', async () => {
      const showInDatabase = await showRepository.find()

      expect(showInDatabase?.length).toBe(0)

      const res = await request(app.getHttpServer())
        .delete(`/show/${userId}`)
        .set('Authorization', `Bearer ${userToken}`) // Add the Authorization header here

      expect(res.status).not.toBe(200)

      const showInDatabaseAfterCall = await showRepository.find()

      expect(showInDatabaseAfterCall.length).toBe(0)

    });
  })
});
