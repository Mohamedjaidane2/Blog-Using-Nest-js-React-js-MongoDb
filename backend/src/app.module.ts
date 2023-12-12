import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { PodcastsModule } from './podcasts/podcasts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Blog'),
    UsersModule,
    AuthModule,
    PostsModule,
    PodcastsModule,
 ],

})
export class AppModule {}
