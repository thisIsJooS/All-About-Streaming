exports.home = function (req, res, next) {
  try {
    const service = req.query.service;
    if (!service) {
      return res.render("home");
    }

    return res.render(`service${service}`);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
