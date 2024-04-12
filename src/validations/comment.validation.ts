import Joi from "joi";

const validator = (schema: Joi.ObjectSchema<any>) => (payload: any) =>
	schema.validate(payload, { abortEarly: false });

const commentSchema = Joi.object({
	user: Joi.string().min(2).max(50).optional(),
	comment: Joi.string().min(2).max(100).required(),
});

const validateComment = validator(commentSchema);

export default validateComment;