const express = require("express")
const app = express()
const connection = require("./Config/db")
const garageRoutes =  require("./Routes/garage.routes")
const engineerRoutes = require("./Routes/engineer.routes")
const jobRoutes = require("./Routes/jobCard.routes")

app.use(express.json())

app.use("/api/garage",garageRoutes)
app.use("/api/engineers", engineerRoutes);
app.use("/api/jobCards", jobRoutes); 

const PORT = 8000


app.get("/",(req,res)=>{

     res.status(200).send("Home Page")
})


const startServer = async () => {
    try {
        await connection();  // Ensure DB is connected first
        app.listen(PORT, () => {
            console.log("Welcome to server");
        });
    } catch (err) {
        console.error("DB connection failed:", err);
        process.exit(1);  // Exit the app if DB is dead
    }
};

startServer();