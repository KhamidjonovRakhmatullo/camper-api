const CampingPlace = require("../models/campingPlace.model");

const addNewCampingPlace = async (req, res) => {
  try {
    const {
      name,
      location,
      city,
      phone_number,
      working_hour,
      home_page,
      description,
      map,
    } = req.body;

    const campingPlace = await CampingPlace.create({
      name,
      location,
      city,
      phone_number,

      working_hour: {
        from: working_hour.from,
        to: working_hour.to
    },

      home_page,
      description,
      map:{
        latitude: map.latitude,
        longitude: map.longitude
      }
    });

    res.status(201).json({
        success: true,
        dataCP: campingPlace
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {addNewCampingPlace}