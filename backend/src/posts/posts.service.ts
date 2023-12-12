import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>) {}
//add post 
async addPost (id:string, createPostDto:CreatePostDto):Promise<any>{
  const {cover,description,title,mediaLink}=createPostDto;
  var today = new Date();
  var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate()+'--'+today.getHours()+":"+today.getMinutes()+':'+today.getSeconds();
  const result=await this.UserModel.findOneAndUpdate({_id:id},{$push:{article:{
        id:uuidv4(),
        cover:cover,
        mediaLink:mediaLink,
        description:description,
        title:title,
        articleCreationDate:date
  }}})    
  if (!result){
    throw new NotFoundException('user not found')
  }else{
    return result
  }
}
//display all posts "super admin"
  async displayAllPosts():Promise<any[]>{
    const res=await this.UserModel.find().exec()
    const Article=[]
    res.map((user)=>{
      user.article.map((posts)=>{
        Article.push(posts)
      })
    })
    return Article
    }
//get all posts
  async GetAllPosts (id: string):Promise<[object]> {
      const res = await this.UserModel.findById(id).exec()
      return res.article
    }
//get post by id 
  async findPost(id: string,idP:string):Promise<object> {
  const res = await this.UserModel.findById(id).exec();
  const posts= res.article
  const searchPost = posts.find((post) => post.id==idP);
  return searchPost
}
//delete post 
  async deletePost (id: string, idp:string):Promise<any> {
    const res= await this.UserModel.updateOne({_id: id}, {$pull: {article: {id: idp}}})
    return res
}
//update post
  async updatePost(id: string,idp:string, UpdatePostDto : UpdatePostDto):Promise<any> {
  const {mediaLink,cover,description,title}=UpdatePostDto ;
  const res = await this.UserModel.updateOne(
    { _id: id, article :{$elemMatch:{id:idp}} },
    {
        $set: {
            "article.$.mediaLink":mediaLink,
            "article.$.cover":cover,
            "article.$.description":description,
            "article.$.title":title,
         }
    }
)
  return res
}

}
