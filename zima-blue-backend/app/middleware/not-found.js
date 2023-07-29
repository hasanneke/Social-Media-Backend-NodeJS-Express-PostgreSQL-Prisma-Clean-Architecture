const notFoundMiddleWare = (req, res) =>
  res.status(404).send("Route does not exist");

module.exports = notFoundMiddleWare;
