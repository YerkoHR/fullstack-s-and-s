const bcript = require("bcryptjs");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

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
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User does not exist");
    }

    const isEqual = await bcript.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Invalid credentials");
    }

    const token = await jwt.sign(
      { userId: user.id, email: user.email },
      "supersecretkey",
      { expiresIn: "1h" }
    );
    return {
      userId: user.id,
      token,
      tokenExpiration: 1
    };
  }
};
