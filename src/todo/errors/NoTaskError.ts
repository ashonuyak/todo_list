export class NoTaskError extends Error {
  constructor() {
    super(`There is no task with this ID.`)
  }
}
