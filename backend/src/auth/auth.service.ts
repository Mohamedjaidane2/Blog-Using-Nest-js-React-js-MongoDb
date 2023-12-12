import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthCredentialsDto } from './dto/auth.credential.dto';
import { User, UserDocument } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload-interface';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  //singin
  async validateUserPassword(
    AuthCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { userName, password } = AuthCredentialsDto;
    const user = await this.UserModel.findOne({ userName });
    const match = await bcrypt.compare(password, user.password);
    if (user && match) {
      const payload: JwtPayload = {
        _id: user._id,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        createdDate: user.createdDate,
        article: user.article,
        picture: user.picture,
        bio:user.bio
      };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new HttpException(
        'invalid user name or password',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
