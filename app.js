require("dotenv").config();

const express = require("express");
const connectDb = require("./config/db.config")


//DB connection
connectDb();

const app = express();

app.use(express.json());


app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));