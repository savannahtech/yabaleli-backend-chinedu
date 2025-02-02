import { AppError } from '../../exceptions/app';
import { generateToken, hashPassword, verifyPassword } from '../../shared/utils/helpers';
import { ICreateUser, IUser } from './interface';
import { UserModel } from './user.model';
import { createUserValidationSchema } from './validation';
import { v4 as uuid } from 'uuid';

export const createUser = async (userDto: ICreateUser): Promise<Omit<IUser, 'password'>> => {
  const validation = createUserValidationSchema.safeParse(userDto);
  if (!validation.success) {
    throw new AppError(validation.error.issues[0].message, 422);
  }
  const userExist = await getUserByEmail(userDto.email);
  if (userExist) {
    throw new AppError('User with email already exists', 400);
  }
  const encryptPassword = hashPassword(userDto.password);
  const user: Partial<IUser> = {
    ...userDto,
    _id: uuid(),
    password: encryptPassword,
  };
  const createUser = new UserModel(user);
  createUser.save();
  return {
    _id: createUser._id,
    name: createUser.name,
    email: createUser.email,
    createdAt: createUser.createdAt,
    updatedAt: createUser.updatedAt,
  };
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return UserModel.findOne({ email }).lean().exec();
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{
  user: Omit<IUser, 'password'>;
  token: string;
}> => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new AppError('User not found', 400);
  }
  if (!verifyPassword(password, user.password)) {
    throw new AppError('Invalid User credentials', 400);
  }
  const token = generateToken({ email: user.email, _id: user._id });
  if (!token) {
    throw new AppError('Oops something went wrong', 400);
  }
  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    token,
  };
};
