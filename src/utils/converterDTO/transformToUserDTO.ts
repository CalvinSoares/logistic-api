import { TypeUser } from '../../@types/userType';
import { UserDTO } from '../../dto/userDto';

export const transformToUserDTO = (user: TypeUser | null): UserDTO => {
  if (!user || typeof user !== 'object') {
    throw new Error('Invalid user data');
  }
  return {
    _id: user._id.toString(),
    username: user.username,
    email: user.email,
    role: user.role,
  };
};
