const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/myData');
        console.log(`MongoDB Server Connected: ${conn.connection.host}`);

        const db = mongoose.connection.db;
        const fetch_data = db.collection("foods");
        const foodCategory = db.collection("foodcategories");

        const data = await fetch_data.find({}).toArray();
        const catData = await foodCategory.find({}).toArray();

        global.food_items = data;
        global.foodCategory = catData;

    } catch (error) {
        console.error("Could not connect to the database:", error);
    }
};

module.exports = connectDB;