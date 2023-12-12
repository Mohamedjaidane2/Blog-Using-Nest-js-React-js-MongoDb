    import { IsString, MaxLength, MinLength } from "class-validator";
export class CreatePostDto {


    @IsString()
    cover:string;

    @IsString()
    title:string;

    @IsString()
    description:string;

    @IsString()
    mediaLink:string
}


