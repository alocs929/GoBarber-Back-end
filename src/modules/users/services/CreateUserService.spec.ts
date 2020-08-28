import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('shold be able to create a new users', async () => {
    const user = await createUser.execute({
      name: 't123',
      email: 't123@gmail.com',
      password: '123',
    });

    expect(user).toHaveProperty('id');
  });

  it('shold not be able to create two users on the some email', async () => {
    await createUser.execute({
      name: 't123',
      email: 't123@gmail.com',
      password: '123',
    });

    await expect(
      createUser.execute({
        name: 't123',
        email: 't123@gmail.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
