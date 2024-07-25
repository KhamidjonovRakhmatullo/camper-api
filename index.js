const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db");
const morgan = require("morgan");
const colors = require("colors");
const ErrorHandler = require("./middleware/errorHandler");
const path = require("path")

//initionalize .env
dotenv.config();

//conneting db 
connectDB()


//app instance
const app = express();

//for data
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//static file for uploaded images
app.use(express.static(path.join(__dirname, "public")))

//development
if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}

///////routes
//home
app.use("/", (req, res)=> {res.send("<h1>API run!</h1>")})
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
//camping Place
app.use("/v1/campingPlace", require("./routes/campingPlace.routes"))
//err
app.use(ErrorHandler)

//port listen
const PORT = process.env.PORT || 8080
app.listen(PORT, ()=> {
    console.log(`---Server running on: ${PORT}`.bgBlue)
})