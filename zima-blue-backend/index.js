const express = require("express");
const app = express();

const {
  notFoundMiddleWare,
  errorHandlerMiddleware,
  authMiddleWare,
} = require("./middleware/index");
const { authRouter, postsRouter } = require("./routes/index");

app.use(express.json());

app.use("/auth", authRouter);
app.use("/api/v1/posts", postsRouter);

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
