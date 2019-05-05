const { buildSchema } = require("graphql");

module.exports = buildSchema(`

type Anime {
  _id: ID!
  title: String!
  synopsis: String!
  image: String!
  broadcast: String!
  format: String!
  status: String!
  source: String!
  episodes: Int!
  score: Float!
  genres: [String!]
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

input AnimeInput {
  title: String!
  synopsis: String!
  image: String!
  broadcast: String!
  format: String!
  status: String!
  source: String!
  episodes: Int!
  score: Float!
  genres: [String!]!
  date: String!
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
    saveAnime(animeInput: AnimeInput): Anime
    createUser(userInput: UserInput): User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
