exports.home = function (req, res, next) {
  try {
    console.log(__dirname, req.url);
    return res.render("home");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.s1 = function (req, res, next) {
  try {
    res.render("service1");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.s2 = function (req, res, next) {
  try {
    res.render("service2");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.s3 = function (req, res, next) {
  try {
    res.render("service3");
  } catch (error) {
    console.error(error);
    next(error);
  }
};
