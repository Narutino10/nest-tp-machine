import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RecipesService {
  private recipes: Recipe[] = [];
  private idCounter = 1;

  create(createRecipeDto: CreateRecipeDto, user: User): Recipe {
    const recipe: Recipe = {
      id: this.idCounter++,
      title: createRecipeDto.title,
      description: createRecipeDto.description,
      createdAt: new Date(),
      updatedAt: new Date(),
      user,
    };
    this.recipes.push(recipe);
    return recipe;
  }

  findAll(user: User): Recipe[] {
    if (user.roles.includes('admin')) {
      return this.recipes;
    }
    return this.recipes.filter((r) => r.user.id === user.id);
  }

  findOne(id: number, user: User): Recipe {
    const recipe = this.recipes.find((r) => r.id === id);
    if (!recipe) throw new NotFoundException('Recipe not found');
    if (recipe.user.id !== user.id && !user.roles.includes('admin')) {
      throw new ForbiddenException('Access denied');
    }
    return recipe;
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto, user: User): Recipe {
    const recipe = this.findOne(id, user);
    if (updateRecipeDto.title) recipe.title = updateRecipeDto.title;
    if (updateRecipeDto.description)
      recipe.description = updateRecipeDto.description;
    recipe.updatedAt = new Date();
    return recipe;
  }

  remove(id: number, user: User): void {
    const recipe = this.findOne(id, user);
    this.recipes = this.recipes.filter((r) => r.id !== recipe.id);
  }
}
