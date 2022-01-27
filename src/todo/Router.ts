import Router from 'koa-joi-router'

import { TYPES } from './constants'
import { IController } from './interfaces'
import container from './Module'
import { Validator } from './Validator'

const controller = container.get<IController>(TYPES.IController)

const router = Router()

router.post('/todo', Validator.createTask, controller.createTask)
router.get('/todo/all', controller.getAllTasks)
router.get('/todo/:title', controller.getTasksByTitleId)
router.put('/todo', Validator.taskIsDone, controller.taskIsDone)

export default router
