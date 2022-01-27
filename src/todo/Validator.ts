import Router from 'koa-joi-router'

const joi = Router.Joi

export class Validator {
  static createTask: Router.Config = {
    validate: {
      type: 'json',
      body: {
        title: joi.string().required(),
        task: joi.string().max(100).required()
      }
    }
  }

  static taskIsDone: Router.Config = {
    validate: {
      type: 'json',
      body: {
        id: joi.number().required()
      }
    }
  }
}
