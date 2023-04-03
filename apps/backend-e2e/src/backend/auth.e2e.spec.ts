import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@tv-app/backend/src/app/app.module';
import { AuthService } from '@tv-app/backend/src/auth/auth.service';
import { UserService } from '@tv-app/backend/src/user/user.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@tv-app/backend/src/user/user.entity';
import { CreateUserDto } from '@tv-app/backend/src/user/dto/create-user.dto';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let userService: UserService;
  let authService: AuthService;

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

    userRepository = moduleFixture.get<Repository<User>>(getRepositoryToken(User));
    userService = moduleFixture.get<UserService>(UserService);
    authService = moduleFixture.get<AuthService>(AuthService);
  });

  beforeEach(async () => {
    // Create a test user
    await userService.createUser(testUser);
  });

  afterEach(async () => {
    // Clean up the test user
    await userRepository.delete({ username: testUser.username });
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/login (POST) - success', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: testUser.username, password: testUser.password })
      .expect(201);

    expect(response.body.access_token).toBeDefined();
  });

  it('/auth/login (POST) - failure', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: testUser.username, password: 'wrongpassword' })
      .expect(401);

    expect(response.body.message).toEqual('Unauthorized');
  });
});
