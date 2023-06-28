import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [TaskModule,
            TypeOrmModule.forRoot({
              type:'postgres',
              host: 'localhost',
              port: 5432,
              username: 'postgres',
              password: '12345678',
              database: 'proyecto',
              autoLoadEntities: true,
              synchronize: true
            }),
            UserModule,          
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
