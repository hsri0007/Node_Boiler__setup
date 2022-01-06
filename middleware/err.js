const ErrHandler = (err, req, res, next) => {
  console.log("im triggered");
  return res.status(500).json({
    success: false,
    error: err.message,
  });
};

module.exports = ErrHandler;
