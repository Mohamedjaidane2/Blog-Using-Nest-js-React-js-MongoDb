import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { CreatePodcastDto } from './dto/create-podcast.dto';
import { UpdatePodcastDto } from './dto/update-podcast.dto';
import { User } from 'src/users/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { contentFileFilter, editFileName} from './contentFilter';


@Controller('podcasts')
export class PodcastsController {
  constructor(private readonly podcastsService: PodcastsService) {}

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
        url:`http://localhost:3000/podcasts/uploaded/mediaLink/${file.filename}`,
    };
    return response;
  }
  
  @Get('/uploaded/mediaLink/:mediaLink')
  seeContentFile(@Param('mediaLink') mediaLink, @Res() res) {
    return res.sendFile(mediaLink, { root: './content' });
  }


  @Patch('/add/:id')
  async addPost(@Param('id') id: string, @Body() CreatePodcastDto: CreatePodcastDto):Promise<any> {
    return this.podcastsService.addPodcast(id, CreatePodcastDto);
  }

  @Get('/mypodcasts/:id')
  async GetAllPosts(@Param('id') id: string):Promise<[object]> {
      return this.podcastsService.GetAllPodcasts(id);
  }

  @Get('/:id/:idp')
  async FindPost(@Param('id') id: string , @Param('idp') idp:string ):Promise<object> {
    return this.podcastsService.findPodcast(id,idp);
  }

  @Patch('/delete/:id/:idp')
  async deletePost(@Param('id') id: string,@Param('idp') idp:string ):Promise<any> {
    return this.podcastsService.deletePodcast(id, idp);
  }

  @Patch('/update/:id/:idp')
  async updatePost(@Param('id') id: string,@Param('idp') idp:string , @Body() updatePodcastDto:UpdatePodcastDto ):Promise<User> {
    return this.podcastsService.updatePodcast(id, idp,updatePodcastDto);
  }
}
