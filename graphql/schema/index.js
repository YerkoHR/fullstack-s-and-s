const { buildSchema } = require("graphql");

module.exports = buildSchema(`

type Anime {
  _id: ID!
  mal_id: Int!
  createdAt: String!
  updatedAt: String!
  date: String!
  creator: User!
}

type User {
  _id: ID!
  email: String!
  password: String
  savedAnime: [Anime!]
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

input UserInput {
  email: String!
  password: String!
}

type RootQuery {
    animes: [Anime!]!
    login(email: String!, password: String!): AuthData! 
}

type RootMutation {
    saveAnime(id: Int!): Anime!
    createUser(userInput: UserInput): User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
