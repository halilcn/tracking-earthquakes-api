exports.status = (req, res, next) => {
  res.success({
    currentStatus: true,
  });
};
