require("dotenv").config();

const express = require("express");
const connectDb = require("./config/db.config")
const cors = require("cors")

//DB connection
connectDb();

const app = express();

app.use(express.json());

app.use(cors());

//public routes

app.use("/auth", require("./routes/auth.routes"));
app.use("/group-vehicles", require("./routes/car.routes"));

//middleware routes

//private routes
//app.use("/rent", require("./routes/rent.routes"));



app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));