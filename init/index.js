const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
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
  // Loop through each listing to fetch coordinates and set the owner
  for (let i = 0; i < initData.data.length; i++) {
    let response = await geocodingClient
      .forwardGeocode({
        query: `${initData.data[i].location}, ${initData.data[i].country}`,
        limit: 1,
      })
      .send();

    initData.data[i].geometry = response.body.features[0].geometry;
    initData.data[i].owner = "6acf4b6f21297189efc20632"; // Your specific owner ID
  }
  await Listing.insertMany(initData.data);
  console.log("data was initialize");
};

initDB();
