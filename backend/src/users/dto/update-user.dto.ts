import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IS_EMAIL,IS_DATE,IS_NOT_EMPTY, MaxLength, MinLength } from "class-validator";


export class UpdateUserDto extends PartialType(CreateUserDto) {
    

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    firstName:string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    lastName:string;

    @IsString()
    bio:string;
    
}
