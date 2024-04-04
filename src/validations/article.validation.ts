import Joi from "joi";

interface IArticle {
	title: string;
	content: string;
	image: string;
}

const validator = (schema: Joi.ObjectSchema<any>) => (payload: IArticle) =>
	schema.validate(payload, { abortEarly: false });

const articleSchema = Joi.object({
	title: Joi.string().min(0).max(60).required(),
	content: Joi.string().required(),
	image: Joi.string().required(),
});

const validateArticle = validator(articleSchema);
export default validateArticle;