const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db");
const morgan = require("morgan");
const colors = require("colors")

//initionalize .env
dotenv.config();

//conneting db 
connectDB()


//app instance
const app = express();

//for data
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//development
if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}

///////routes
//auth
app.use("/v1/auth", require("./routes/user.routes"))
//motor
app.use("/v1/motor", require("./routes/motor.routes"))
//caravan
app.use("/v1/caravan", require("./routes/caravan.routes"))
//tuning
app.use("/v1/tuning", require("./routes/tuning.routes"))
//usedCar
app.use("/v1/usedCar", require("./routes/usedCar.routes"))

//port listen
const PORT = process.env.PORT || 8080
app.listen(PORT, ()=> {
    console.log(`---Server ruinning on: ${PORT}`.bgBlue)
})