const Booking = require("../../models/bookings");
const Event = require("../../models/event");
const { transformBooking, transformEvent } = require("./merge");

module.exports = {
  bookings: () => {
    return Booking.find()
      .then(bookings => {
        return bookings.map(booking => {
          return transformBooking(booking);
        });
      })
      .catch(err => {
        throw err;
      });
  },
  bookEvent: args => {
    return Event.findOne({ _id: args.eventId })
      .then(event => {
        const newBooking = new Booking({
          user: "5cb46763fc4b6c20d8103a8d",
          event
        });
        return newBooking.save();
      })
      .then(res => {
        return transformBooking(res);
      })
      .catch(err => {
        throw err;
      });
  },
  cancelBooking: async args => {
    try {
      const booking = await Booking.findById(args.bookingId).populate("event");
      const event = transformEvent(booking.event);

      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (err) {
      throw err;
    }
  }
};
