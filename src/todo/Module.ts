import { Container } from 'inversify'

import { TYPES } from './constants'
import { Controller } from './Controller'
import { IController, IDao, IService } from './interfaces'
import { Repository } from './Repository'
import { Service } from './Service'

const container = new Container()

container.bind<IDao>(TYPES.IDao).to(Repository).inSingletonScope()

container.bind<IService>(TYPES.IService).to(Service).inSingletonScope()

container.bind<IController>(TYPES.IController).to(Controller).inSingletonScope()

export default container
