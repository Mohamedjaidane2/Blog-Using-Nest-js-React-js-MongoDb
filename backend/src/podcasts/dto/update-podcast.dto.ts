import { PartialType } from '@nestjs/swagger';
import { CreatePodcastDto } from './create-podcast.dto';
import { IsString } from 'class-validator';

export class UpdatePodcastDto extends PartialType(CreatePodcastDto) {

    @IsString()
    cover:string;

    @IsString()
    title:string;
    
    @IsString()
    mediaLink:string
}

