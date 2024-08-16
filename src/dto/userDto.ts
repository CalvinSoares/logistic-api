export type UserDTO = {
  _id: string;
  username: string;
  email: string;
  role: 'admin' | 'driver' | 'customer';
};

export type CreateUserDTO = {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'driver' | 'customer';
};
