import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { RolesGuard } from '../auth/roles.guard';
// import { Roles } from '../auth/roles.decorator';
import { Request } from 'express';
import { User } from '../users/entities/user.entity';

@ApiTags('recipes')
@ApiBearerAuth()
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createRecipeDto: CreateRecipeDto, @Req() req: Request) {
    return this.recipesService.create(createRecipeDto, req.user as User);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req: Request) {
    return this.recipesService.findAll(req.user as User);
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  // @UseGuards(RolesGuard)
  // @Roles('admin')
  findAllAdmin(@Req() req: Request) {
    // Ici, on pourrait vérifier le rôle admin dans le service ou via un guard
    return this.recipesService.findAll({
      ...(req.user as User),
      roles: ['admin'],
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.recipesService.findOne(+id, req.user as User);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
    @Req() req: Request,
  ) {
    return this.recipesService.update(+id, updateRecipeDto, req.user as User);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.recipesService.remove(+id, req.user as User);
  }
}
