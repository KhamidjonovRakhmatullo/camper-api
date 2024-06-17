const mongoose = require("mongoose")

const connectDB = async()=> {
    mongoose.set("strictQuery", false)
    //try
   try {
    const connecting = await mongoose.connect(process.env.MONGO_URL)
    console.log(
        `---MongoDB connected on: ${connecting.connection.host}, on port: ${connecting.connection.port}`.bgGreen)
    //catch
   } catch (error) {
    console.log(`ERROR connecting to MongoDB`, error)
   }
}

module.exports = connectDB