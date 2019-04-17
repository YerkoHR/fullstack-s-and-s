const bcript = require("bcryptjs");

const Event = require("../../models/event");
const User = require("../../models/user");
const Booking = require("../../models/bookings");

const events = eventsIds => {
  return Event.find({ _id: { $in: eventsIds } })
    .then(events => {
      return events.map(event => {
        return {
          ...event._doc,
          _id: event.id,
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event.creator)
        };
      });
    })
    .catch(err => {
      throw err;
    });
};

const singleEvent = eventId => {
  return Event.findById(eventId)
    .then(event => {
      return {
        ...event._doc,
        _id: event.id,
        creator: user.bind(this, event.creator)
      };
    })
    .catch(err => {
      throw err;
    });
};

const user = userId => {
  return User.findById(userId)
    .then(user => {
      return {
        ...user._doc,
        _id: user.id,
        createdEvents: events.bind(this, user._doc.createdEvents)
      };
    })
    .catch(err => {
      throw err;
    });
};

module.exports = {
  events: () => {
    return Event.find()
      .populate("creator")
      .then(events => {
        return events.map(event => {
          return {
            ...event._doc,
            _id: event.id,
            date: new Date(event._doc.date).toISOString(),
            creator: user.bind(this, event._doc.creator)
          };
        });
      })
      .catch(err => {
        throw err;
      });
  },
  createEvent: args => {
    const { title, description, price, date } = args.eventInput;

    const event = new Event({
      title,
      description,
      price: +price,
      date: new Date(date),
      creator: "5cb46763fc4b6c20d8103a8d"
    });
    let createdEvent;
    return event
      .save()
      .then(res => {
        createdEvent = {
          ...res._doc,
          _id: res.id,
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, res._doc.creator)
        };
        return User.findById("5cb46763fc4b6c20d8103a8d");
      })
      .then(user => {
        if (!user) {
          throw new Error("User not found.");
        }
        user.createdEvents.push(event);
        return user.save();
      })
      .then(res => {
        return createdEvent;
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  },
  bookings: () => {
    return Booking.find()
      .then(bookings => {
        return bookings.map(booking => {
          return {
            ...booking._doc,
            _id: booking.id,
            user: user.bind(this, booking._doc.user),
            event: singleEvent.bind(this, booking._doc.event),
            createdAt: new Date(booking._doc.createdAt).toISOString(),
            updatedAt: new Date(booking._doc.updatedAt).toISOString()
          };
        });
      })
      .catch(err => {
        throw err;
      });
  },
  createUser: args => {
    return User.findOne({ email: args.userInput.email })
      .then(user => {
        if (user) {
          throw new Error("User exists already.");
        }
        return bcript.hash(args.userInput.password, 12);
      })
      .then(hashedPassword => {
        const user = new User({
          email: args.userInput.email,
          password: hashedPassword
        });
        return user.save();
      })
      .then(res => {
        return { ...res._doc, password: null, _id: res.id };
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
        return {
          ...res._doc,
          _id: res.id,
          user: user.bind(this, res._doc.user),
          event: singleEvent.bind(this, res._doc.event),
          createdAt: new Date(res._doc.createdAt).toISOString(),
          updatedAt: new Date(res._doc.updatedAt).toISOString()
        };
      })
      .catch(err => {
        throw err;
      });
  },
  cancelBooking: async args => {
    try {
      const booking = await Booking.findById(args.bookingId).populate("event");
      const event = {
        ...booking.event._doc,
        _id: booking.event.id,
        creator: user.bind(this, booking.event._doc.creator)
      };
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (err) {
      throw err;
    }
  }
};
