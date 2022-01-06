const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
      console.log(error, 1);
    }
  };
};

module.exports = asyncWrapper;
