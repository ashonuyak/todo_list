export class NoSuchTasksError extends Error {
  constructor(title: string) {
    super(`You don't have tasks with title "${title}"`)
  }
}
