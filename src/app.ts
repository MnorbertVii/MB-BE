import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import "dotenv/config";
import routes from './routes';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import specs from '../documentation';


const app: Express = express();
app.use(cors({origin: "*" }));
app.use(express.json());
app.use(morgan('dev'));

const PORT: string | undefined = process.env.PORT;
const DB_URL: string | undefined = process.env.DB_URL;
if (!DB_URL) {
    throw new Error('DB_URL is not set');
}
try{
    mongoose.set("strictQuery", false);
    mongoose.connect(DB_URL);
    console.log("Connected to database");

    app.use('/', routes);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    app.use('*', (req: Request, res: Response) => {
        res.status(404).json({message: "Resource Not Found"});
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} catch (error) {
    console.log(error);
}

export default app;