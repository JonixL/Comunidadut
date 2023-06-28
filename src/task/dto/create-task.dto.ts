import { IsString, IsNumber, IsNotEmpty } from "@nestjs/class-validator";
import { User } from "src/user/entities/user.entity";
export class CreateTaskDto {
    @IsString()
    @IsString()
    @IsNotEmpty()
    title: string
    @IsString()
    description: string
    @IsNumber()
    important: number
    
    user: User
    userid: number
    

}
