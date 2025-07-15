import { Injectable, ConflictException } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  create(email: string, password: string): User {
    if (this.users.find((u) => u.email === email)) {
      throw new ConflictException('Email déjà utilisé');
    }
    const user: User = {
      id: this.idCounter++,
      email,
      password, // à hasher en vrai !
      roles: ['user'],
    };
    this.users.push(user);
    return user;
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }
}
