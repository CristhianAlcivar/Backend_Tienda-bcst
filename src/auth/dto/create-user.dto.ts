import { IsArray, IsBoolean, IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @MinLength(4)
    name: string;

    @IsString()
    @IsEmail()
    email:string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;

    @IsArray()
    @IsOptional()
    roles:Array<string>;

}
