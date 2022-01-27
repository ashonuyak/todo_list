import { SelectQueryBuilder, UpdateResult } from 'typeorm'
import { Title, Todo } from '../entities'

export interface IDao {
  createTask({
    task,
    createdAt,
    title
  }: {
    task: string
    createdAt: Date
    title: number
  }): Promise<Todo>

  getTitleIdByName(title: string): Promise<Title | undefined>

  getTasksByTitleId(titleId: number): Promise<Todo[]>

  getAllTasks(): Promise<Todo[]>

  taskIsDone({ id, doneAt }: { id: number; doneAt: Date }): Promise<void>

  getStatus(id: number): Promise<Todo | undefined>
}
