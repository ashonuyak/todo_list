export class NoTasksError extends Error {
  constructor() {
    super(`You have got no tasks`)
  }
}
