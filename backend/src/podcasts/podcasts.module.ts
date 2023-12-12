import { Module } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { PodcastsController } from './podcasts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/entities/user.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:User.name,schema:UserSchema}])],
  controllers: [PodcastsController],
  providers: [PodcastsService]
})
export class PodcastsModule {}
