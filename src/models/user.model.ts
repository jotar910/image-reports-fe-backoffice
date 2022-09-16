export interface UserModel {
  id: number;
  email: string;
  role: 'ADMIN' | 'USER';
}
