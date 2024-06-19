const Motor = require("../models/motor.model");

const addNewMotor = async (req, res) => {
  try {
    const { name, cost, type, people, date, company, location, rate } =
      req.body;

    const motor = await Motor.create({
      name,
      cost,
      type,
      people,
      date,
      company,
      location,
      rate,
    });
    res.status(201).json({
      success: true,
      data: motor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllMotor = async (req, res)=> {
  try {
    const pageLimit = process.env.DEFAULT_PAGE_LIMIT || 3
    const limit = parseInt(req.query.limit || pageLimit)
    const page = parseInt(req.query.page || 1)
    const total = await Motor.countDocuments();
  
    const motor = await Motor.find().skip(page * limit - limit);
  
    res.status(201).json({
      pageCount: Math.ceil(total / limit),
      success: true,
      currentPage: page,
      dataMotor: motor,
    })
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = { addNewMotor, getAllMotor };
