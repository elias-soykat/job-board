const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch((err) => {
   return  next(err);
  });
};

module.exports = catchAsync;
