import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { error, log } from 'console';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)private userRepository: Repository<User>) {}
    private jwtS:JwtService

    
    async create(createUser: CreateUserDto) {
      try {
        const{password,...useData}=createUser;
        const user = this.userRepository.create({
          ...useData, password: bcrypt.hashSync(password, 10)
        });
        await this.userRepository.save(user);
        delete user.password;
        return{...user}
      } catch ([error]) {
        return error
      }
    //const user = this.userRepository.create(createUser);
    //await this.userRepository.save(user);
    //return user;
  }

  findAll() {
    const users = this.userRepository.find();
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({relations:['tasks'],
    where:{id}});
    if (!user) {throw new BadRequestException("Usuario no encontrado")};
    return user;
  }

  async update(id: number, updateUser: UpdateUserDto) {
    await this.userRepository.update(id, updateUser);
    const user = await this.userRepository.findOne({where:{id}});
    if (!user){throw new BadRequestException("Usuario no encontrado")}
    return user;
  }

  async remove(id: number) {
    this.userRepository.delete(id);
    return `This action removes a #${id} user`;
  }

  async login(user: LoginDto){
    const {password,email}=user;
    const userFind = await this.userRepository.findOne(
      {where:{email}, select:{
        password:true, 
        edad:true,
        email:true,
        nombre:true,
        apellidos:true,
        sexo:true,
        estado:true}}
    );
    if(!userFind){ throw new UnauthorizedException
      ('Credenciales no validas');}
    if(!bcrypt.compareSync(password, userFind.password)){
      throw new UnauthorizedException('Credenciales no validas');
    }
    delete userFind.password
    return {...userFind,
               token:this.getJWToken({id:userFind.id, nombre:userFind.nombre,apellidos:userFind.apellidos})};

  }

  private getJWToken(payload:{id:number, nombre:string, apellidos:string}){
    const token = this.jwtS.sign(payload);
    return token;
  }
}
