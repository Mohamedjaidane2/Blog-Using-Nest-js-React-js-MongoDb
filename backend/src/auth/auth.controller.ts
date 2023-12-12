import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Get,
  Request
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth.credential.dto';
import { User} from '../users/entities/user.entity';
import { JwtAuthGuard } from './jwt_authGuard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  //signIn
  @Post('/signin')
  @UsePipes(ValidationPipe)
  async signin(
    @Body(ValidationPipe) AuthCredentialsDto: AuthCredentialsDto,
  ): Promise<{accessToken:string}> {
    return this.authService.validateUserPassword(AuthCredentialsDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
