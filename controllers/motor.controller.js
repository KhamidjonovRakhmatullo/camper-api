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
    })
  } catch (error) {
    res.status(201).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {addNewMotor}
