import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, MaxLength, MinLength } from "class-validator";

export class ChangePassword extends PartialType(CreateUserDto) {
    
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password:string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    old_password_validation

}
