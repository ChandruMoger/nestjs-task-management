import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  STAGE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(27017).required(),
  DB_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
