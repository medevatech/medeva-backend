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
// const REDIS_HOST = process.env.REDIS_HOST;
// const REDIS_PORT = process.env.REDIS_PORT;

// // Create a Redis client
// const client = redis.createClient({
//   host: REDIS_HOST,
//   port: REDIS_PORT,
// });

// // Handle errors
// client.on('error', function (err) {
//   console.log('Error: ' + err);
// });

// function cache(req, res, next) {
//   const key = '__express__' + req.originalUrl || req.url;

//   client
//     .get(key)
//     .then((reply) => {
//       if (reply) {
//         res.send(JSON.parse(reply));
//       } else {
//         res.sendResponse = res.send;
//         res.send = (body) => {
//           //expire in 1 min
//           client.set(key, JSON.stringify(body), { EX: 60 });
//           res.sendResponse(body);
//         };
//         next();
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send(err);
//     });
// }

// app.use(cache);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
app.use(cors());

app.use(cookieParser());
app.use(morgan('dev'));

app.use('/api/v1/', mainRouter);

app.all('*', (res, next) => {
  res.status(404).json({
    status: 'error',
    statusCode: 404,
    message: 'check again your endpoint',
  });
});

app.use('/', (req, res, next) => {
  res.status(200).json({ status: 'success', statusCode: 200 });
});

app.listen(port, () => {
  console.log(`🚀 Example app listening on port ${port}`);
});
