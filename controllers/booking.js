const express = require("express");
const Listing = require("../models/listing");
const Booking = require("../models/booking");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports.paymentgateway = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  let { checkIn, checkOut } = req.body.booking;

  let requestedCheckIn = new Date(checkIn);
  let requestedCheckOut = new Date(checkOut);

  const overlappingBookings = await Booking.find({
    listing: listing._id,
    $and: [
      { checkIn: { $lt: requestedCheckOut } },
      { checkOut: { $gt: requestedCheckIn } },
    ],
  });

  if (overlappingBookings.length > 0) {
    req.flash(
      "error",
      "Sorry, these dates are already booked! Please select different dates.",
    );
    return res.redirect(`/listings/${listing._id}`);
  }

  let timeDiff = Math.abs(
    requestedCheckOut.getTime() - requestedCheckIn.getTime(),
  );
  let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  let total = diffDays * listing.price;

  let newBooking = new Booking({
    listing: listing._id,
    author: req.user._id,
    checkIn: requestedCheckIn,
    checkOut: requestedCheckOut,
    totalPrice: total,
  });
  await newBooking.save();

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "inr", // Set to USD for the US test account
          product_data: {
            name: `Booking for ${listing.title}`,
            description: `${diffDays} night(s) stay`,
          },
          unit_amount: total * 100, // Stripe requires the amount in cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${req.protocol}://${req.get("host")}/listings/${listing._id}/bookings/${newBooking._id}/success`,
    cancel_url: `${req.protocol}://${req.get("host")}/listings/${listing._id}`,
  });

  newBooking.stripeSessionId = session.id;
  await newBooking.save();

  res.redirect(303, session.url);
};

module.exports.successRoute = async (req, res) => {
  let { bookingId } = req.params;
  await Booking.findByIdAndUpdate(bookingId, {
    status: "Confirmed",
    paymentStatus: "Paid",
  });

  req.flash("success", "Payment successful! Your trip is booked.");
  res.redirect("/account");
};