import Joi from "joi";

interface UserPayload {
    fullName?: string;
    email: string;
    password: string;
    isAdmin: boolean
}

const userSchema = Joi.object<UserPayload>({
    fullName: Joi.string().optional(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).regex(/^(?=.*[0-9])/).required(),
    isAdmin: Joi.boolean().optional()
});

const validateUser = (payload: UserPayload) => {
    return userSchema.validate(payload, { abortEarly: false });
};

export default validateUser;