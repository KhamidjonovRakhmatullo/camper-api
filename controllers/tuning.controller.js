const TuningScheme = require("../models/tuning.model");

const addNewTuning = async (req, res) => {
  try {
    const { name, cost, type, people, date, company, location, rate } =
      req.body;

    const tuning = await TuningScheme.create({
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
      dataTuning: tuning,
    });
  } catch (error) {
    res.status(201).json({
        success: false,
        message: error.message,
    })
  }
};

module.exports = {addNewTuning};
