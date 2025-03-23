
const mongoose = require("mongoose")


const dotenv = require("dotenv")

dotenv.config()
const Connect = async()=>{

    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        // console.log(`MongoDB Connected: ${conn.connection.host}`)
        console.log(`MongoDB Connected:`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }

}


module.exports= Connect
