const User = require("../models/user.js");
const Booking = require("../models/booking.js");

module.exports.renderSignUpForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        next(err);
      }
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.Login = async (req, res) => {
  req.flash("success", "Welcome back to Wanderlust!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.Logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logged out!");
    res.redirect("/listings");
  });
};

module.exports.allBookings = async (req, res) => {
  const allBookings = await Booking.find({ author: req.user._id }).populate(
    "listing",
  );
  res.render("users/account.ejs", { bookings: allBookings });
};

module.exports.cancelBooking = async (req, res) => {
  let { id } = req.params;
  const booking = await Booking.findById(id);
  if (!booking) {
    req.flash("error", "Booking not found!");
    return res.redirect("/account");
  }
  if (!booking.author.equals(req.user._id)) {
    req.flash("error", "You don't have permission to cancel this booking!");
    return res.redirect("/account");
  }
  await Booking.findByIdAndDelete(id);
  req.flash("success", "Booking cancelled successfully!");
  res.redirect("/account");
};