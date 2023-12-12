import {
  NotFoundException,
  HttpException,
  HttpStatus,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import {ChangePassword} from './dto/change.password.dto';
import { UploadedImg } from './dto/uploaded.img.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>) {}

//hashing password
  private async hashedPwd(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
//create user 
  async create(createUserDto: CreateUserDto): Promise <User> {
    const {userName,password ,firstName,lastName ,role}=createUserDto;
    const user = await this.UserModel.findOne({userName});
    if (user){
      throw new HttpException('User Already Exists', HttpStatus.BAD_REQUEST);
    }
    const createdUser=new this.UserModel({
      userName,
      role,
      lastName,
      firstName,
      password: await this.hashedPwd(password)
    });
    const result= await createdUser.save();
    return result
  }
//find all users
  async findAll():Promise<User[]> {
    return await this.UserModel.find().exec();
  }
// find user by id
  async findOne(id: string):Promise<User> {
    const found = await this.UserModel.findById(id).exec();
    if(!found){
      throw new NotFoundException();
    }
    return found ;
  }
//find by username
  async findByBlogLink(blogLink: string ):Promise<User> {
    const User = await this.UserModel.findOne({blogLink})
    return User
  }
//updateuser
  async update(id: string, updateUserDto: UpdateUserDto):Promise<User> {
    const {firstName,lastName}=updateUserDto;
    const res = await this.UserModel.findByIdAndUpdate(id,{
       firstName,
       lastName
      })
      return res
  }
//update bio
async updateBio(id: string, updateUserDto: UpdateUserDto):Promise<User> {
  const {bio}=updateUserDto;
  const res = await this.UserModel.findByIdAndUpdate(id,{
     bio
    })
    return res
}//delete user
  async remove(id : string):Promise<User> {
    const deletedUser = await this.UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundException(`User #${id} not found `);
    }
    return deletedUser;
 }
 //change password
 async changePassword(id: string, changePassword: ChangePassword):Promise<User> {
  const {password,old_password_validation}=changePassword;
  const user = await this.UserModel.findById(id);
  const match = await bcrypt.compare(old_password_validation, user.password)
  if(match){
    const res = await this.UserModel.findByIdAndUpdate(id,{
        password:await bcrypt.hash(password, 10),
     })
     return res
    } else {
      throw new BadRequestException("invalid password")
    }
  }
 
  //change profile picture
    async changeProfilePic(id: string, uplodedImgdto :UploadedImg):Promise<User> {
      const {picture}=uplodedImgdto;
        const res = await this.UserModel.findByIdAndUpdate(id,{
        picture
         })
         return res
      }
  
  }

