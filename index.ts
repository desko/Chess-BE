import express, { Express } from 'express';
import RouterRoutes from './routes/routes';
import 'dotenv/config';
import { corsOptions } from './common/constants';
const cors = require('cors');

require('dotenv').config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors(corsOptions));
app.use(RouterRoutes);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
