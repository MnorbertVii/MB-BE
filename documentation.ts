import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import dotenv from "dotenv";

dotenv.config();

const options: Options = {
	definition: {  
		openapi: "3.0.0",
		info: {
			title: "Swagger API documentation ",
			version: "1.0.0",
			description: "API for professional branding website",
		},

		servers: [
			{
				url: process.env.SWAGGER_URL,
			},
		],

		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
	},
	apis: ["./src/swagger/*.ts"],
};

const specs = swaggerJSDoc(options);

export default specs;