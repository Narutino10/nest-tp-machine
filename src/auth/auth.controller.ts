import { Controller, Post, Body } from '@nestjs/common';
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
  validateEmail(@Body() dto: { email: string; code: string }) {
    return this.authService.validateEmail(dto.email, dto.code);
  }

  @Post('login')
  async login(@Body() dto: { email: string; password: string }) {
    return this.authService.login(dto.email, dto.password);
  }

  @Post('validate-2fa')
  validate2FA(@Body() dto: { email: string; code: string }) {
    return this.authService.validate2FA(dto.email, dto.code);
  }
}
