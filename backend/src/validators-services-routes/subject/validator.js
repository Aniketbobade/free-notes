const validator = {};

validator.addSubject = async (req, res, next) => {
  try {
    if (req.body.name == "" || req.body.name == null) {
      res.status(400).json({ message: "Name is required" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = validator;