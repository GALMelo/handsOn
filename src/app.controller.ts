import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthDto } from './auth/dto/auth.dto';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { Public } from './auth/public.decorator';

@ApiTags('Auth')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private authService: AuthService) {}


  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({ type: AuthDto })
  @Public()
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

}
