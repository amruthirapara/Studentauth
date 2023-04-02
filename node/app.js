const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./routes/userRoutes');
const connectDB = require('./connect/connectdb');
dotenv.config({ path: './config.env' });

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

connectDB(DATABASE_URL);

app.use(cors());
app.use(express.json());
app.use('/api/user', router);

app.listen(port, () => {
  console.log(`server listening at ${port}`);
});
