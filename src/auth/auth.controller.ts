import { Controller, Post, Body } from '@nestjs/common';
import { ValidateEmailDto } from './dto/validate-email.dto';
import { LoginDto } from './dto/login.dto';
import { Validate2FADto } from './dto/validate-2fa.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    // Ici, on ne gère que l'email pour la démo, à compléter avec le password et la sauvegarde réelle
    return this.authService.register(dto.email, dto.password);
  }

  @Post('validate-email')
  validateEmail(@Body() dto: ValidateEmailDto) {
    return this.authService.validateEmail(dto.email, dto.code);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @Post('validate-2fa')
  validate2FA(@Body() dto: Validate2FADto) {
    return this.authService.validate2FA(dto.email, dto.code);
  }
}
