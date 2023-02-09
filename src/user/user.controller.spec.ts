import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    handleRegister: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    handleLogin: jest.fn((dto) => {
      return {
        id: Date.now(),
        token: Date.now(),
        ...dto,
      };
    }),
  };

  const createDto = {
    firstName: 'Jane',
    lastName: 'Doe',
    password: 'password',
    email: 'jane@gmail.com',
  };

  const updateDto = {
    firstName: 'John',
  };

  const loginDto = {
    password: 'password',
    email: 'jane@gmail.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be define', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    expect(controller.handleRegister({ ...createDto })).toEqual({
      id: expect.any(Number),
      ...createDto,
      password: expect.any(String),
    });
  });

  it('should login a user', () => {
    expect(controller.login({ ...loginDto })).toEqual({
      token: expect.any(Number),
      id: expect.any(Number),
      ...loginDto,
    });
  });
});