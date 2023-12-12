import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/entities/user.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:User.name,schema:UserSchema}])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
