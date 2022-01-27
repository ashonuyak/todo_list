export class CompletedTaskError extends Error {
  constructor() {
    super(`You have already done this task!`)
  }
}
