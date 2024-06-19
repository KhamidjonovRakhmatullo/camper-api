const Caravan = require("../models/caravan.model");

const addNewCaravan = async (req, res) => {
  try {
    const { name, cost, type, people, date, company, location, rate } =
      req.body;

    const caravan = await Caravan.create({
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
      dataCaravan: caravan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {addNewCaravan}
