import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // Req,
  // UseGuards,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { RolesGuard } from '../auth/roles.guard';
// import { Roles } from '../auth/roles.decorator';

// Pour le TP, on simule l'utilisateur connecté (à remplacer par l'auth plus tard)
const mockUser = {
  id: 1,
  email: 'user@mail.com',
  password: '',
  roles: ['user'],
};
const mockAdmin = {
  id: 2,
  email: 'admin@mail.com',
  password: '',
  roles: ['admin'],
};

@ApiTags('recipes')
@ApiBearerAuth()
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto, mockUser);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  findAll() {
    return this.recipesService.findAll(mockUser);
  }

  @Get('admin')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  findAllAdmin() {
    return this.recipesService.findAll(mockAdmin);
  }

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(+id, mockUser);
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipesService.update(+id, updateRecipeDto, mockUser);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.recipesService.remove(+id, mockUser);
  }
}
