import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { CreatePodcastDto } from './dto/create-podcast.dto';
import { UpdatePodcastDto } from './dto/update-podcast.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PodcastsService {

  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>) {}
//add podcast 
async addPodcast (id:string, createPodcastDto:CreatePodcastDto):Promise<any>{
  const {cover,title,mediaLink}=createPodcastDto;
  const result=await this.UserModel.findOneAndUpdate({_id:id},{$push:{podcast:{
        id:uuidv4(),
        cover:cover,
        mediaLink:mediaLink,
        title:title,
  }}})    
  if (!result){
    throw new NotFoundException('')
  }else{
    return result
  }
}

//get all podcasts
async GetAllPodcasts (id: string):Promise<[object]> {
  const res = await this.UserModel.findById(id).exec()
  return res.podcast
}
//get podcast by id
async findPodcast(id: string,idP:string):Promise<object> {
  const res = await this.UserModel.findById(id).exec();
  const podcast= res.podcast
  const searchPodcast = podcast.find((post) => post.id==idP);
  return searchPodcast
}

//delete podcast
async deletePodcast (id: string, idp:string):Promise<any> {
  const res= await this.UserModel.updateOne({_id: id}, {$pull: {podcast: {id: idp}}})
  return res
}

//update podcast
async updatePodcast(id: string,idp:string, UpdatePodcastDto : UpdatePodcastDto):Promise<any> {
  const {mediaLink,cover,title}=UpdatePodcastDto ;
  const res = await this.UserModel.updateOne(
    { _id: id, podcast :{$elemMatch:{id:idp}} },
    {
        $set: {
            "podcast.$.mediaLink":mediaLink,
            "podcast.$.cover":cover,
            "podcast.$.title":title,
         }
    }
)
  return res
}

}
