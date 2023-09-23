const express= require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('./config/connDB');
const userRoutes = require('./routes/userRoutes');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 7300
db();

app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes)
app.listen(PORT,()=>{
    console.log(`server is connected at ${PORT}`)
})