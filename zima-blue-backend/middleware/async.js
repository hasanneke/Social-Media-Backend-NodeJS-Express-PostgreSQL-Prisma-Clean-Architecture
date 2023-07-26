const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.log(`Async Wrapper Error: ${error}`);
      next(error);
    }
  };
};

module.exports = asyncWrapper;
