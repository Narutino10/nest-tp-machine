export class User {
  id: number;
  email: string;
  password: string;
  roles: string[]; // ['user'] ou ['admin']
}
