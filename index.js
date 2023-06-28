const express = require('express');
const cors = require(`cors`);
const cookieParser = require('cookie-parser');
const morgan = require(`morgan`);
const bodyParser = require(`body-parser`);
require(`dotenv`).config();
const redis = require('redis');

const mainRouter = require('./src/routes/index');
const { response } = require(`./src/middleware/common`);

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'local:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: '*',
};
app.use(cors());

app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/v1/', mainRouter);

app.use('/', (req, res, next) => {
  res.status(200).json({ status: 'success', statusCode: 200 });
});

app.listen(port, () => {
  console.log(`🚀 Example app listening on port ${port}`);
});
