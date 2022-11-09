import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @MinLength(4)
    name: string;

    @IsString()
    @IsEmail()
    email:string;

    @IsString()
    @MinLength(10)
    password: string;
}
