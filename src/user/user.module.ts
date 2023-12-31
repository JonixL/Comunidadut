import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
            PassportModule.register({defaultStrategy:'jwt'}),
            JwtModule.register({secret:'secretWord', signOptions:{expiresIn:'1h'}})],
  controllers: [UserController],
  providers: [UserService,
              PassportModule,
              JwtModule],
  exports: [PassportModule,
            JwtModule]            
})
export class UserModule {}
