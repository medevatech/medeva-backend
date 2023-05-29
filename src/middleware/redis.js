const client = require(`../config/redis`);
const { response } = require(`../middleware/common`);

const cache = async (req, res, next) => {
  const key = req.originalUrl || req.url;

  client
    .get(key)
    .then((reply) => {
      if (reply) {
        res.send(JSON.parse(reply));
      } else {
        res.sendResponse = res.send;

        res.send = (body) => {
          res.sendResponse(body);
        };
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

module.exports = {
  cache,
};
