import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
describe('Authenticate', ()=>{
  it('shold be able to authenticate', async ()=>{
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name:'t123',
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


  it('shold not be able to authenticate with non existing user', async ()=>{
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();


    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(authenticateUser.execute({
      email: 't123@gmail.com',
      password: '123',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('shold not be able to authenticate with wrong password', async ()=>{
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name:'t123',
      email: 't123@gmail.com',
      password: '123',
    });


    expect(authenticateUser.execute({
      email: 't123@gmail.com',
      password: '123regg',
    })).rejects.toBeInstanceOf(AppError);
  });

});
