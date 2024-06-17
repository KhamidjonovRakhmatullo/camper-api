const UsedCarScheme = require("../models/usedCar.model");

const addNewUsedCar = async(req, res) => {
  try {
    const { name, cost, type, people, date, company, location, rate } =
      req.body;

    const usedcar = await UsedCarScheme.create({
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
        dataUsedCar: usedcar
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {addNewUsedCar}
