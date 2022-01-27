import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Todo } from './TodoEntity'

@Entity({ name: 'title' })
export class Title {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => Todo, (todo) => todo.title)
  todos: Todo[]
}
