const express = require("express");
const app = express();
const postsRoute = require("./routes/posts_route");
const authRoute = require("./routes/auth_route");
const notFoundMiddleWare = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authMiddleWare = require("./middleware/authentication");

app.use(express.json());

app.use("/auth", authRoute);
app.use("/api/v1/posts", authMiddleWare, postsRoute);
app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
