import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsNotEmpty()
    nombre: string
    
    @IsString()
    @IsNotEmpty()
    apellidos: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    sexo: string

    @IsNumber()
    edad: number
}
