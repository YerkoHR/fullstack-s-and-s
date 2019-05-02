const bcript = require("bcryptjs");
const User = require("../../models/user");

module.exports = {
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
  }
};
