const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");
const Booking = require("../models/booking.js");
const {isLoggedIn}= require("../middleware.js")

router
  .route("/signup")
  .get(userController.renderSignUpForm)
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.Login,
  );
router.get("/account", isLoggedIn, userController.allBookings);
// DELETE route to cancel a booking
router.delete("/account/bookings/:id", isLoggedIn, userController.cancelBooking);

router.get("/logout", userController.Logout);

module.exports = router;
