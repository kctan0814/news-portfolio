exports.handleCustomErrors = (err, req, res, next) => {
  if (err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};


exports.handlePsqlErrors = (err, req, res, next) => {
  console.log('went to the error handlers')
  if (err.code) {
    res.status(400).send({ msg: 'Bad request' });
  } else {
    next(err);
  }
}

exports.handleServerErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error" });
};