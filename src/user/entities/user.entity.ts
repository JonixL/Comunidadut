import { Task } from "src/task/entities/task.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    nombre: string;

    @Column('text')
    apellidos: string;

    @Column('text', {unique: true})
    email: string;

    @Column('text', {select: false})
    password: string;

    @Column('bool',{default:true})
    estado: boolean;

    @Column('text')
    sexo: string;

    @Column('int', {nullable: true})
    edad:number;

    @OneToMany(()=>Task,(t)=>t.user)
    tasks: Task [];
}
