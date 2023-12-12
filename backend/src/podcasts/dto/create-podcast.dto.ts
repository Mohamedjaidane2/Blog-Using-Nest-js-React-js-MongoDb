import { IsString, MaxLength, MinLength } from "class-validator";

export class CreatePodcastDto {

    @IsString()
    cover:string;

    @IsString()
    title:string;

    @IsString()
    mediaLink:string

}




   