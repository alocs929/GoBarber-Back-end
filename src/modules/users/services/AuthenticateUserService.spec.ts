import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('Authenticate', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('shold be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 't123',
      email: 't123@gmail.com',
      password: '123',
    });

    const response = await authenticateUser.execute({
      email: 't123@gmail.com',
      password: '123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('shold not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 't123@gmail.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 't123',
      email: 't123@gmail.com',
      password: '123',
    });

    await expect(
      authenticateUser.execute({
        email: 't123@gmail.com',
        password: '123regg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
