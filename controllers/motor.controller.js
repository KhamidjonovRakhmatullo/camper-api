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
    res.status(500).json({
      success: true,
      data: motor,
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllMotor = async(req, res) => {
  try {
    // const pageLimit = process.env.DEFAULT_PAGE_LIMIT || 5;
    // const limit = parseInt(req.qeury.limit || pageLimit);

    const motor = await Motor.find();

    res.status(201).json({
      success: true,
      MotorAllData: motor
    })

  } catch (error) {
    res.status(201).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { addNewMotor, getAllMotor };
