import { IsString, MaxLength, MinLength } from "class-validator";
export class CreateUserDto {


    @IsString()
    @MinLength(4)
    @MaxLength(20)
    userName:string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    firstName:string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    lastName:string;
    
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password:string;

    @IsString()
    role:string

}
