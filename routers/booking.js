const express = require("express");
const router = express.Router({ mergeParams: true }); // mergeParams is required to access the :id parameter
const Listing = require("../models/listing");
const {isLoggedIn} = require("../middleware.js");
const { paymentgateway, successRoute } = require("../controllers/booking.js");

router.post("/",isLoggedIn, paymentgateway);

// Update the booking to Paid and Confirmed
router.get("/:bookingId/success", isLoggedIn, successRoute);

module.exports = router;
