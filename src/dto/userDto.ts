export type UserDTO = {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'driver' | 'customer';
};
