import { User } from '../../users/entities/user.entity';

export class Recipe {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  user: User; // Propriétaire de la recette
}
