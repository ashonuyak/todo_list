/* eslint-disable arrow-body-style */
/* eslint-disable no-shadow */
import { injectable } from 'inversify'
import { getConnection, SelectQueryBuilder, UpdateResult } from 'typeorm'
import { Title, Todo } from './entities'
import { IDao } from './interfaces/IDao'

@injectable()
export class Repository implements IDao {
  createTask({
    task,
    createdAt,
    title
  }: {
    task: string
    createdAt: Date
    title: number
  }): Promise<Todo> {
    const urlRepository = getConnection().getRepository(Todo)
    return urlRepository.save({ task, createdAt, title })
  }

  getTitleIdByName(title: string): Promise<Title | undefined> {
    return getConnection().getRepository(Title).findOne({ name: title })
  }

  getTasksByTitleId(title: number): Promise<Todo[]> {
    return getConnection().getRepository(Todo).find({ title })
  }

  async getAllTasks(): Promise<Todo[]> {
    const response = await getConnection()
      .getRepository(Title)
      .createQueryBuilder('title')
      .leftJoinAndSelect('title.todos', 'todo')
      .getMany()

    const a = response.reduce(
      (
        acc: Array<{
          task: string
          isDone: boolean
          createdAt: Date
          doneAt?: Date
          title: string
        }>,
        { id, name, todos }: { id: number; name: string; todos: Todo[] }
      ) => {
        return acc.concat(
          todos.reduce(
            (
              acc: Array<{
                task: string
                isDone: boolean
                createdAt: Date
                doneAt?: Date
                title: string
              }>,
              {
                id,
                task,
                isDone,
                createdAt,
                doneAt,
                title
              }: {
                id: number
                task: string
                isDone: boolean
                createdAt: Date
                doneAt?: Date
                title: number
              }
            ) => {
              return acc.concat({
                task,
                isDone,
                createdAt,
                doneAt,
                title: name
              })
            },
            []
          )
        )
      },
      []
    )
    return getConnection().getRepository(Todo).find()
  }

  async taskIsDone({ id, doneAt }: { id: number; doneAt: Date }): Promise<void> {
    getConnection().getRepository(Todo).update(id, { doneAt, isDone: true })
  }

  async getStatus(id: number): Promise<Todo | undefined> {
    return getConnection().getRepository(Todo).findOne(id)
  }
}
