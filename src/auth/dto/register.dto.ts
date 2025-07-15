import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  Matches,
  IsArray,
  ArrayNotEmpty,
  IsIn,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
    {
      message:
        'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.',
    },
  )
  password: string;

  @ApiProperty({
    isArray: true,
    example: ['user'],
    enum: ['user', 'admin'],
    description: 'Rôles à attribuer (user ou admin)',
    default: ['user'],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsIn(['user', 'admin'], { each: true })
  roles: string[];
}
