import { IsString, IsNotEmpty, IsNumber, IsEmail, MinLength } from "@nestjs/class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    nombre: string
    
    @IsString()
    @IsNotEmpty()
    apellidos: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    sexo: string

    @IsNumber()
    edad: number
}
