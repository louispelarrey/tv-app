import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { Repository } from 'typeorm';
import { AppModule } from '@tv-app/backend/src/app/app.module';
import { UserService } from '@tv-app/backend/src/user/user.service';
import { User } from '@tv-app/backend/src/user/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from '@tv-app/backend/src/user/dto/create-user.dto';
import { UpdateUserDto } from '@tv-app/backend/src/user/dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@tv-app/backend/src/role/enums/role.enum';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let userService: UserService;
  let userToken: string;
  let userId: number;

  const testUser: CreateUserDto = {
    username: 'testuser22',
    email: 'testuser22@example.com',
    password: 'testpassword',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const jwtService = moduleFixture.get<JwtService>(JwtService);
    userToken = jwtService.sign({ username: testUser.username, sub: 1, roles: [Role.User] });

    userRepository = moduleFixture.get<Repository<User>>(getRepositoryToken(User));
  });

  afterAll(async () => {
    await app.close();
  });

  it('/user (POST) - create user', async () => {
    const response = await request(app.getHttpServer())
      .post('/user')
      .send(testUser)
      .expect(201)

    const usersInDatabase = await userRepository.find()

    userId = response.body.id;
    expect(userId).toBeDefined();
    expect(usersInDatabase?.length).toBe(1)
  });

  describe('/user/:id (GET) - get user by id', () => {
    it('should return a user by id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/user/${userId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.id).toEqual(userId);
      expect(response.body.username).toEqual(testUser.username);
      expect(response.body.email).toEqual(testUser.email);
    });

    it('should return forbidden if user does not exist', async () => {
      const nonExistentId = 'non-existent-id';
      await request(app.getHttpServer())
        .get(`/user/${nonExistentId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);
    });
  });

  describe('/user/:id (PUT) - update user', () => {
    it('should update an existing user', async () => {
      const updateData: UpdateUserDto = {
        username: 'updateduser',
        email: 'updateduser@example.com',
        password: 'updatedpassword',
      };

      await request(app.getHttpServer())
        .put(`/user/${userId}`)
        .send(updateData)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      const updatedUser = await userRepository.findOne({ where: { id: userId } });
      expect(updatedUser.username).toEqual(updateData.username);
      expect(updatedUser.email).toEqual(updateData.email);
    });
  });


  describe('/user/:id (DELETE) - delete user', () => {
    it('should correctly remove an existing user', async () => {
      const usersInDatabase = await userRepository.find()

      expect(usersInDatabase?.length).toBe(1)

      const res = await request(app.getHttpServer())
        .delete(`/user/${userId}`)
        .set('Authorization', `Bearer ${userToken}`) // Add the Authorization header here

      expect(res.status).toBe(200)

      const usersInDatabaseAfterCall = await userRepository.find()

      expect(usersInDatabaseAfterCall.length).toBe(0)
    });

    it('should return an error if no user exists', async () => {
      const usersInDatabase = await userRepository.find()

      expect(usersInDatabase?.length).toBe(0)

      const res = await request(app.getHttpServer())
        .delete(`/user/${userId}`)
        .set('Authorization', `Bearer ${userToken}`) // Add the Authorization header here

      expect(res.status).not.toBe(200)

      const usersInDatabaseAfterCall = await userRepository.find()

      expect(usersInDatabaseAfterCall.length).toBe(0)

    });
  })
});
