import { IsEmail, IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateEquipmentDto {

    @IsString()
    @MinLength(4)
    nameClient: string;

    @IsString()
    @MinLength(2)
    lastNameClient: string;

    @IsString()
    @IsEmail()
    email:string;

    @IsString()
    @MinLength(1)
    nameEquipment: string;

    @IsString()
    @MinLength(1)
    serie: string;

    @IsString()
    @MinLength(1)
    description: string;

    @IsInt()
    @IsPositive()
    @Min(1)
    category: number;
}