import { ConnectionOptions } from 'typeorm'
import config from 'config'
import { Todo, Title } from './src/todo/entities'

const connection: ConnectionOptions = {
  type: 'postgres',
  url: `postgres://${config.get('database.user')}:${config.get('database.password')}@${config.get(
    'database.host'
  )}:${config.get('database.port')}/${config.get('database.dbName')}`,
  entities: [Todo, Title],
  logging: false,
  synchronize: true,
  migrations: ['migrations/*.ts'],
  cli: {
    migrationsDir: 'migrations',
    entitiesDir: 'src/todo/entities'
  }
}
export default connection
