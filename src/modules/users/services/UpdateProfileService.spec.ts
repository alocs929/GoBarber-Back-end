import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('shold be able update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Bruno',
      email: 't123@gmail.com',
      password: '123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Bruno 3',
      email: 't123@gmail.com',
    });

    expect(updatedUser.name).toBe('Bruno 3');
    expect(updatedUser.email).toBe('t123@gmail.com');
  });

  it('shold not be able update the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'Test',
        email: 'b@gmil.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Bruno',
      email: 't123@gmail.com',
      password: '123',
    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@gmail.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Bruno 3',
        email: 't123@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Bruno',
      email: 't123@gmail.com',
      password: '123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Bruno 3',
      email: 't123@gmail.com',
      old_password: '123',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('shold not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Bruno',
      email: 't123@gmail.com',
      password: '123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Bruno 3',
        email: 't123@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shold not be able to update the password wit wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Bruno',
      email: 't123@gmail.com',
      password: '123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Bruno 3',
        email: 't123@gmail.com',
        old_password: 'wrong-old-pass',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
