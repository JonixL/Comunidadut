import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "src/user/entities/user.entity";
@Entity('task')
export class Task {

    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    title: string

    @Column('text')
    description:  string
    
    @Column('bool', {default:false})
    estate:  boolean

    @Column()
    important:  number

    @ManyToOne(()=>User,(u)=>u.tasks)
    user: User;
}