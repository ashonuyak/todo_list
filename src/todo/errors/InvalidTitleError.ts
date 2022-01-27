export class InvalidTitleError extends Error {
  constructor() {
    super(
      'Title should be one of the following values: "Home", "Work", "Shopping", "Sport", "Other"'
    )
  }
}
