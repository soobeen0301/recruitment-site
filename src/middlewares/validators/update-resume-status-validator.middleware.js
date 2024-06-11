import Joi from 'joi';
import { MESSAGES } from '../../constants/messages.constant.js';
import { RESUME_STATUS } from '../../constants/resume.constant.js';

const schema = Joi.object({
  status: Joi.string()
    .required()
    .valid(...Object.values(RESUME_STATUS))
    .messages({
      'any.required': MESSAGES.RESUMES.UPDATE.STATUS.NO_STATUS,
      'any.only': MESSAGES.RESUMES.UPDATE.STATUS.INVALID_STATUS,
    }),
  reason: Joi.string().required().messages({
    'any.required': MESSAGES.RESUMES.UPDATE.STATUS.NO_REASON,
  }),
});

export const updatedResumeStatusValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
