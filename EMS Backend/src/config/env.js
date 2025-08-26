import dotenv from 'dotenv';
import joi from 'joi';

dotenv.config();

const envSchema = joi.object({
    PORT: joi.number().default(4000),
    NODE_ENV: joi.string().valid('development', 'production', 'test').default('development'),
    MONGODB_URI: joi.string().uri().required().description('Mongo DB connection string'),
    
    JWT_ACCESS_SECRET: joi.string().required(),
    JWT_REFRESH_SECRET: joi.string().required(),
    JWT_ACCESS_TTL: joi.string().default('15m'),
    JWT_REFRESH_TTL: joi.string().default('30d'),

    SMTP_HOST: joi.string().allow(""),
    SMTP_PORT: joi.number().allow(""),
    SMTP_USER: joi.string().allow(""),
    SMTP_PASS: joi.string().allow(""),
    MAIL_FROM: joi.string().default("HR <no-reply@example.com>"),

    BASE_URL: joi.string().default("http://localhost:4000"),
}).unknown()

const {value, error} = envSchema.validate(process.env);
if(error){
    throw new Error(`Config validation error: ${error.message}`)
}

export const env = value;