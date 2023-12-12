import { PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @IsString()
    cover:string;

    @IsString()
    title:string;

    @IsString()
    description:string;
    
    @IsString()
    mediaLink:string
}
