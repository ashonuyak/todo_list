/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'inversify'

import { AppContext } from '../app'
import { TYPES } from './constants'
import { CompletedTaskError } from './errors/CompletedTaskError'
import { InvalidTitleError } from './errors/InvalidTitleError'
import { NoSuchTasksError } from './errors/NoSuchTasksError'
import { NoTaskError } from './errors/NoTaskError'
import { NoTasksError } from './errors/NoTasksError'
import { IController } from './interfaces'
import { IService } from './interfaces/IService'

@injectable()
export class Controller implements IController {
  constructor(@inject(TYPES.IService) private readonly service: IService) {}

  createTask = async (ctx: AppContext): Promise<void> => {
    const { title, task } = ctx.request.body
    try {
      await this.service.createTask({ title, task })
      ctx.status = 201
    } catch (err) {
      if (err instanceof InvalidTitleError) {
        ctx.throw(404, err.message)
      }
      throw err
    }
  }

  getTasksByTitleId = async (ctx: AppContext): Promise<void> => {
    const { title } = ctx.request.params
    try {
      ctx.body = await this.service.getTasksByTitle(title)
      ctx.status = 200
    } catch (err) {
      if (err instanceof InvalidTitleError) {
        ctx.throw(400, err.message)
      } else if (err instanceof NoSuchTasksError) {
        ctx.throw(404, err.message)
      }
      throw err
    }
  }

  getAllTasks = async (ctx: AppContext): Promise<void> => {
    try {
      ctx.body = await this.service.getAllTasks()
      ctx.status = 200
    } catch (err) {
      if (err instanceof NoTasksError) {
        ctx.throw(404, err.message)
      }
      throw err
    }
  }

  taskIsDone = async (ctx: AppContext): Promise<void> => {
    const { id } = ctx.request.body
    try {
      await this.service.taskIsDone(id)
      ctx.status = 200
    } catch (err) {
      if (err instanceof NoTaskError) {
        ctx.throw(404, err.message)
      } else if (err instanceof CompletedTaskError) {
        ctx.throw(400, err.message)
      }
      throw err
    }
  }
}
