export type UserDTO = {
  _id: string;
  username: string;
  email: string;
  role: 'admin' | 'driver' | 'customer';
};
