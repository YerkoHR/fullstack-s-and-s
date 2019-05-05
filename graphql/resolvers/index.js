const authResolver = require("./auth");
const animesResolver = require("./animes");

const rootResolver = {
  ...authResolver,
  ...animesResolver
};

module.exports = rootResolver;
