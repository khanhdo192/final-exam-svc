export interface User {
  id?: string;
  name?: string;
  email: string;
  password?: string;
  phone?: string;
  address?: string;
  avatar?: string;
}
export interface IUser extends User {
  confirmPassword?: string;
  acceptTerms?: boolean;
}
