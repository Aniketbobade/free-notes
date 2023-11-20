const Subject = require("./model");
const service = {};

service.addSubject = async (req, res) => {
  try {
    const subject = await Subject.create(req.body);
    return res.status(200).json({
      success: true,
      subject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
service.getSubjects = async (req, res) => {
  try {
    const fieldId = req.query.fieldId;
    const subjects = await Subject.find({field:fieldId});
    return res.status(200).json({
      success: true,
      subjects,
    });  
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

service.getSubject = async (req, res) => {
  try {
    const subjectId = req.params.id;
    const subject = await Subject.findById(subjectId);
    return res.status(200).json({
      success: true,
      subject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = service;