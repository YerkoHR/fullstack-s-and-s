const Event = require("../../models/event");
const User = require("../../models/user");
const { transformEvent } = require("./merge");

module.exports = {
  events: () => {
    return Event.find()
      .populate("creator")
      .then(events => {
        return events.map(event => {
          return transformEvent(event);
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
        createdEvent = transformEvent(res);
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
  }
};
