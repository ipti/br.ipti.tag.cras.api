import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthService } from './shared/auth.service';
import { JwtAuthGuard } from './shared/jwt-auth.guard';
import { LocalAuthGuard } from './shared/local-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiCreatedResponse({})
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any, @Body() auth: CreateAuthDto) {
    return this.authService.login(req.user);
  }

  @Get('me')
  @ApiOkResponse({ description: 'Dados do usuário autenticado via token' })
  @UseGuards(JwtAuthGuard)
  me(@Request() req: any) {
    // JwtStrategy.validate() já decodificou o token — sem query no banco
    return req.user;
  }
}
