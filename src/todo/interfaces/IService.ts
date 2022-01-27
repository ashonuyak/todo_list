import { SelectQueryBuilder } from 'typeorm'
import { Todo } from '../entities'

export interface IService {
  createTask({ title, task }: { title: string; task: string }): Promise<void>

  getTasksByTitle(title: string): Promise<Todo[] | undefined>

  getAllTasks(): Promise<Todo[]>

  taskIsDone(id: number): Promise<void>
}
