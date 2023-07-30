const serverConfig = (app, port) => {
  function start() {
    try {
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  }
  start();
};

module.exports = serverConfig;
