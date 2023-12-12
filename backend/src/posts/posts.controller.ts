import { Controller, Get, Post, Body, Patch, Param, UseInterceptors, Res, UploadedFile, Delete, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from "../users/entities/user.entity";
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { contentFileFilter, editFileName} from './content_filter';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  
  @Post('/content-upload')
  @UseInterceptors(FileInterceptor('mediaLink',{
    storage:diskStorage({
      destination:'./content' ,
      filename:editFileName,
    }),
    fileFilter:contentFileFilter,
  }),)
  async uploadFile(@UploadedFile() file: Express.Multer.File):Promise<object> {
    const response = {
        url:`http://localhost:3000/posts/uploaded/mediaLink/${file.filename}`,
    };
    return response;
  }
  @Get('/uploaded/mediaLink/:mediaLink')
  seeContentFile(@Param('mediaLink') mediaLink, @Res() res) {
    return res.sendFile(mediaLink, { root: './content' });
  }
  @Patch('/add/:id')
  async addPost(@Param('id') id: string, @Body() createPostDto: CreatePostDto):Promise<any> {
    return this.postsService.addPost(id, createPostDto);
  }
  @Get()
  async displayAllPosts():Promise<any[]> {
    return this.postsService.displayAllPosts();
  }
  @Get('/myposts/:id')
  async GetAllPosts(@Param('id') id: string):Promise<[object]> {
      return this.postsService.GetAllPosts(id);
  }
  @Get('/:id/:idpost')
  async FindPost(@Param('id') id: string , @Param('idpost') idpost:string ):Promise<object> {
    return this.postsService.findPost(id,idpost);
  }
  @Patch('/delete/:id/:idpost')
  async deletePost(@Param('id') id: string,@Param('idpost') idpost:string ):Promise<any> {
    return this.postsService.deletePost(id, idpost);
  }
  @Patch('/update/:id/:idpost')
  async updatePost(@Param('id') id: string,@Param('idpost') idpost:string , @Body() updatePostDto:UpdatePostDto ):Promise<User> {
    return this.postsService.updatePost(id, idpost,updatePostDto);
  }
}
