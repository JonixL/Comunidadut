import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Task } from './entities/task.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task,User])],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
