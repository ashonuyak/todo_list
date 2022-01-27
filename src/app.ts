import 'reflect-metadata'
import Koa, { Context } from 'koa'
import config from 'config'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { createConnection } from 'typeorm'

import connection from '../ormconfig'

import todoRouter from './todo/Router'

export interface AppContext extends Context {}

const app: Koa = new Koa()

const connecting = async () => {
  try {
    await createConnection(connection)
    console.log('Connection to db is successfull')
  } catch (err) {
    console.log(err)
  }
}

const router = new Router()

app.use(bodyParser())

router.use('', todoRouter.middleware())

app.use(router.middleware())

const port = config.get('server.port')

app.listen(port, async () => {
  await connecting()
  console.log(`Server is running on port ${port}`)
})
