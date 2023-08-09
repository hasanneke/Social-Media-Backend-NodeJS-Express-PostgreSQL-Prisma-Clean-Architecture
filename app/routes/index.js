const authRouter = require("./auth_route");
const postsRouter = require("./posts_route");

const routes = (app) => {
  app.use("/auth", authRouter);
  app.use("/api/v1/posts", postsRouter);
};
module.exports = routes;
