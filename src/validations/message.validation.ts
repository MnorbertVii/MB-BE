import Joi from "joi";

interface IMessage {
    name: string;
    email: string;
    message: string;
}

const validator = (schema: Joi.ObjectSchema<any>) => (payload: IMessage) =>
	schema.validate(payload, { abortEarly: false });

const msgSchema = Joi.object({
	name: Joi.string().min(3).max(30).required(),
	email: Joi.string().email().required(),
	message: Joi.string().min(10).max(60).required(),
});

const validateMsg = validator(msgSchema);
export default validateMsg;