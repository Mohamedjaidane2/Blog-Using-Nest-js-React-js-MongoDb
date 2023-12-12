import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, MaxLength, MinLength } from "class-validator";

export class UploadedImg extends PartialType(CreateUserDto) {
    
    @IsString()
    picture:string;

}