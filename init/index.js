const path = require("path");
require("dotenv").config({path:path.join(__dirname,"..",".env")});
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.ATLASDB_URI;

main()
.then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj) => ({
        ...obj, 
        owner:"6ac2af79cbff146c8d139668",
        geometry: { type: 'Point', coordinates: [77.209, 28.6139] },
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();