import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Title } from './TitleEntity'

@Entity({ name: 'todo' })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Title, (title) => title.todos)
  title: number

  @Column()
  task: string

  @Column({ default: false })
  isDone: boolean

  @Column()
  createdAt: Date

  @Column({ nullable: true })
  doneAt: Date
}
