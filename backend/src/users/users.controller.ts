import { Body, Controller, Delete, Get,  UsePipes, Param, Post,ValidationPipe,Patch,Res, UploadedFile, UseInterceptors, UseGuards } from "@nestjs/common";
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from "../users/entities/user.entity";
import { ChangePassword } from "./dto/change.password.dto";
import { UploadedImg } from "./dto/uploaded.img.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { editFileName, imageFileFilter } from "./image_filter";
import { diskStorage } from "multer";
import { JwtAuthGuard } from "src/auth/jwt_authGuard";
import { RolesGuard } from "src/auth/Authorization/roles.guard";
import { Roles } from "src/auth/Authorization/roles.decorator";
import { Role } from "src/auth/Authorization/role.enum";

@Controller('users')
export class UsersController {
      constructor(private readonly usersService: UsersService,
    ) { }

    
  @Post('/create')
  /* @UseGuards(JwtAuthGuard ,RolesGuard)
   @Roles(Role.Admin) 
   */@UsePipes(ValidationPipe)
  async create(@Body(ValidationPipe) createUserDto: CreateUserDto):Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll():Promise<User[]> {
    return this.usersService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string):Promise<User>{
    return this.usersService.findOne(id);
  }
 
  @Get('/personal/blog/:blogLink')
  async getUserByLink(@Param('blogLink') blogLink: string):Promise<User>{
    return this.usersService.findByBlogLink(blogLink);
  }
  @UseGuards(JwtAuthGuard ,RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  @UseGuards(JwtAuthGuard ,RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string):Promise<User> {
    return this.usersService.remove(id);
  }
  
  @Patch('/profil/changePassword/:id')
  async changePassword(@Param('id') id: string, @Body() changePassword: ChangePassword):Promise<User> {
    return this.usersService.changePassword(id, changePassword);
  }
  @Patch('/profil/ChangeProfilePic/:id')
  async changeProfilePic(@Param('id') id: string, @Body() uplodedImgdto :UploadedImg):Promise<User> {
    return this.usersService.changeProfilePic(id, uplodedImgdto);
  }
  @Patch('/profil/update/bio/:id')
  async updateBio(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto):Promise<User> {
    return this.usersService.updateBio(id, updateUserDto);
  }

  @Post('/profile/file-upload')
  @UseInterceptors(FileInterceptor('picture',{
    storage: diskStorage({
      destination: './upload',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }),)
  
  async uploadFile(@UploadedFile() file: Express.Multer.File):Promise<object> {
    const response = {
        url:`http://localhost:3000/users/picture/${file.filename}`,
    };
    return response;
  }
  @Get('/picture/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './upload' });
  }
}

