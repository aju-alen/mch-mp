import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import volunteerRouter from './route/volunteer-Route.js';
import africastalkingRouter from './route/africastalking-Route.js';
import dajariaRouter from './route/dajaria-router.js';
import { corsOptions } from './utils/corsFe.js';
import { errorHandler } from './middleware/errorHandler.js';
dotenv.config();
const app = express();

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/volunteer', volunteerRouter);
app.use('/api/africastalking',africastalkingRouter);
app.use('/api/dajaria',dajariaRouter);


app.use(errorHandler);
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Backend running at port ${PORT}`);
})