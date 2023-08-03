const express = require('express');
const app = express();
const { notFoundMiddleWare, errorHandlerMiddleware } = require('./app//middleware/index');
const routes = require('./app/routes/index');
const expressConfig = require('./frameworks/webserver/express');
const serverConfig = require('./frameworks/webserver/server');

expressConfig(app, express);
routes(app);

app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

serverConfig(app, port);
