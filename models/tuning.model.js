const mongoose = require("mongoose")

const TuningScheme = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
        },
        cost:{
            type:String,
            required: true,
        },
        type:{
            type:String,
            required : true,
        },
        people:{
            type:String,
            requried: true,
        },
        date: {
            type:String,
            required: true,
        },
        company: {
            type:String,
            required: true,
        },
        location: {
            type:String,
            required: true,
        },
        rate: {
            type:String,
            required: true,
        },
    },
    {timestamps: true},
    //createdAt &&updatedAt
)

module.exports = mongoose.model("Tuning", TuningScheme);