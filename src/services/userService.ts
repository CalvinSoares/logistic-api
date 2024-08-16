import { TypeUser } from '../@types/userType';
import { CreateUserDTO } from '../dto/userDto';
import { User } from '../models/userModel';
import { transformToUserDTO } from '../utils/converterDTO/transformToUserDTO';
import bcrypt from 'bcrypt';

class UserService {
  async getAll() {
    const users = (await User.find().lean()) as TypeUser[] | null;
    if (!users) {
      return null;
    }
    const userDTO = users.map((u) => transformToUserDTO(u));
    return userDTO;
  }

  async add(data: CreateUserDTO) {
    const existingUser = await this.findByEmail(data.email);
    if (existingUser) {
      return null;
    }
    const { password, ...restOfData } = data;
    const hash = await bcrypt.hash(password, 10);
    const userCreate = (await User.create({
      password: hash,
      ...restOfData,
    })) as TypeUser | null;

    const userDTO = transformToUserDTO(userCreate);
    return userDTO;
  }

  async findByEmail(email: string) {
    const userFind = (await User.findOne(
      { email: email },
      {},
      { lean: true },
    )) as TypeUser | null;

    if (!userFind) {
      return null;
    }
    const userDTO = transformToUserDTO(userFind);
    return userDTO;
  }

  async findById(id: string) {
    const userFind = (await User.findOne(
      { _id: id },
      {},
      { lean: true },
    )) as TypeUser | null;

    if (!userFind) {
      return null;
    }
    const userDTO = transformToUserDTO(userFind);
    return userDTO;
  }

  async updateById(id: string, data: CreateUserDTO) {
    const userUpdate = (await User.findOneAndUpdate(
      { _id: id },
      { $set: data },
      { new: true, lean: true },
    )) as TypeUser | null;

    if (!userUpdate) {
      return null;
    }
    const userDTO = transformToUserDTO(userUpdate);
    return userDTO;
  }

  async deleteById(id: string) {
    const userDeleted = (await User.findOneAndDelete(
      { _id: id },
      { new: true, lean: true },
    )) as TypeUser | null;
    if (!userDeleted) {
      return null;
    }
    const userDTO = transformToUserDTO(userDeleted);
    return userDTO;
  }
}

export default new UserService();
