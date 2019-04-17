const express = require("express");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");

const rootValue = require("./graphql/resolvers");
const schema = require("./graphql/schema");

const app = express();

app.use(express.json());

app.use(
  "/graphql",
  graphqlHttp({
    schema,
    rootValue,
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@yerkocluster-eardg.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`,
    { useNewUrlParser: true }
  )
  .then(() => app.listen(3000))
  .catch(err => console.log(err));
