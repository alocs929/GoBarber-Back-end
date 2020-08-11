import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
describe('CreateUser', ()=>{
  it('shold be able to create a new users', async ()=>{
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name:'t123',
      email: 't123@gmail.com',
      password: '123',
    });

    expect(user).toHaveProperty('id');


    // expect(user.name).toBe('t123');
    // expect(user.email).toBe('t123@gmail.com');
    // expect(true).toBe(await compare('123', user.password));
  });

  it('shold not be able to create two users on the some email', async ()=>{
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUser.execute({
      name:'t123',
      email: 't123@gmail.com',
      password: '123',
    });

    expect(createUser.execute({
      name:'t123',
      email: 't123@gmail.com',
      password: '123',
    })).rejects.toBeInstanceOf(AppError);
  });
});
