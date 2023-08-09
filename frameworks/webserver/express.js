const expressConfig = (app, express) => {
  app.use(express.json());
};

module.exports = expressConfig;
