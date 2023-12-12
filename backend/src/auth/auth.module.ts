import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from '../users/entities/user.entity';
import {JwtModule} from '@nestjs/jwt'
import {PassportModule} from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [AuthModule,
            PassportModule.register({defaultStrategy:'jwt'}),
            JwtModule.register({
              secret:"topSecret51",
              signOptions:{
                expiresIn:3600,
              }
            }),
            MongooseModule.forFeature([{name:User.name,schema:UserSchema}])],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports:[JwtStrategy,PassportModule],
})
export class AuthModule {}
