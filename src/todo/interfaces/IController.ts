import { AppContext } from '../../app'

export interface IController {
  createTask: (ctx: AppContext) => Promise<void>

  getTasksByTitleId: (ctx: AppContext) => Promise<void>

  getAllTasks: (ctx: AppContext) => Promise<void>

  taskIsDone: (ctx: AppContext) => Promise<void>
}
