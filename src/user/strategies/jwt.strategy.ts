import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm";
import { PassportStrategy } from "@nestjs/passport";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy (Strategy){
   
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ){
        super(
            {
                jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: 'secretWord'
            }
        )
    }

    async validate(payload: any): Promise<User> {
        const {id} = payload;
        const user = await this.userRepo.findOneBy({id: id});
        if (!user) {
            throw new UnauthorizedException("Token no valido");
        }
        if (!user.estado) {
            throw new UnauthorizedException("No active");
        }

        return user;
    }


}

