const mongoose = require("mongoose")

const CampingPlaceScheme = new mongoose.Schema(
    {
        name:{
            type:String,
            require: true,
            unique: true,
        },
        location:{
            type:String,
            require: true,
        },
        city:{
            type:String,
            require: true,
        },
        phone_number:{
            type:String,
            require: true,
        },
        working_hour: {
            from: {
                type: String,
                required: true
            },
            to: {
                type: String,
                required: true
            }
        },
        home_page:{
            type:String,
            require: true,
        },
        description:{
            type:String,
            require: true,
        },
        map: {
            latitude:{
                type:String,
                required: true
            } ,
            longitude:{
                type:String,
                required: true
            }
          },
    },
    {timestamps: true},
      //createdAt & updatedAt
);

module.exports = mongoose.model("CampingPlace", CampingPlaceScheme)