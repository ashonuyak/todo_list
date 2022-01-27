/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'inversify'
import { SelectQueryBuilder } from 'typeorm'

import { TYPES } from './constants'
import { Todo } from './entities'
import { CompletedTaskError } from './errors/CompletedTaskError'
import { InvalidTitleError } from './errors/InvalidTitleError'
import { NoSuchTasksError } from './errors/NoSuchTasksError'
import { NoTaskError } from './errors/NoTaskError'
import { NoTasksError } from './errors/NoTasksError'
import { IDao } from './interfaces/IDao'
import { IService } from './interfaces/IService'

@injectable()
export class Service implements IService {
  constructor(@inject(TYPES.IDao) private readonly repository: IDao) {}

  async createTask({ title, task }: { title: string; task: string }): Promise<void> {
    const titleId = await this.repository.getTitleIdByName(title)
    if (!titleId) {
      throw new InvalidTitleError()
    }
    const createdAt = new Date()
    this.repository.createTask({ task, createdAt, title: titleId.id })
  }

  async getTasksByTitle(title: string): Promise<Todo[] | undefined> {
    const titleId = await this.repository.getTitleIdByName(title)
    if (!titleId) {
      throw new InvalidTitleError()
    }
    const result = await this.repository.getTasksByTitleId(titleId.id)
    if (!result.length) {
      throw new NoSuchTasksError(title)
    }
    return result
  }

  async getAllTasks(): Promise<Todo[]> {
    const result = await this.repository.getAllTasks()
    if (!result.length) {
      throw new NoTasksError()
    }
    return result
  }

  async taskIsDone(id: number): Promise<void> {
    const doneAt = new Date()
    const check = await this.repository.getStatus(id)
    if (check === undefined) {
      throw new NoTaskError()
    } else if (check.isDone) {
      throw new CompletedTaskError()
    }
    this.repository.taskIsDone({ id, doneAt })
  }
}
