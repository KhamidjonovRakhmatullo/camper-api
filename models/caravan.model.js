const mongoose = require( "mongoose")

const CaravanScheme = new mongoose.Schema(
    {
        name: {
            type:String,
            required: true,
        },
        cost: {
            type:String,
            required: true,
        },
        type: {
            type:String,
            required: true,
        },
        people: {
            type:String,
            required: true,
        },
        date:{
            type:String,
            required: true,
        },
        company:{
            type:String,
            required: true,
        },
        location:{
            type:String,
            required: true,
        },
        rate:{
            type:String,
            required: true,
        },
    },
    {timestamps: true},
    //createdAt & updatedAt
);

module.exports = mongoose.model("Caravan", CaravanScheme)