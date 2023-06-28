import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { Task } from './entities/task.entity';
import { Like, Repository } from 'typeorm';
import { error, log } from 'console';
import { User } from 'src/user/entities/user.entity';


@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)private taskRepository: Repository<Task>,
    @InjectRepository(User)private userRepository: Repository<User>) {}

  async create(createTasK: CreateTaskDto) {
    const user = await this.userRepository.findOne({
      where:{
        id:createTasK.userid
      }
    });
    console.log(user);
    const task = this.taskRepository.create({...createTasK,
    user:user});
    await this.taskRepository.save(task);
    return task;
  }

  findAll() {
    const tasks = this.taskRepository.find();
    return tasks;
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({where:{id}});
    if (!task) {throw new BadRequestException("Task not found")};
    return task;
  }

  async findImportan(important: number) {
    
  }

  async update(id: number, updateTask: UpdateTaskDto) {
    await this.taskRepository.update(id, updateTask);
    const task = await this.taskRepository.findOne({where:{id}});
    if (!task) {throw new BadRequestException("Id no encontrado")};
    return task;
  }

  remove(id: number) {
    this.taskRepository.delete(id);
    return `This action removes a #${id} task`;
  }

  async search(termino: string){
    const task = await this.taskRepository.find(
      {where:{title: Like(`%${termino}%`)}});
    return task;
  }

  async buscarimpor(buscar: number){
    const buscarimpor = await this.taskRepository.find(
      {where:{important: buscar}}
    )
    return buscarimpor
  }

  
  
  }
