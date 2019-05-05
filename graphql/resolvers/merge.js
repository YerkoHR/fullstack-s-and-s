const Anime = require("../../models/anime");
const User = require("../../models/user");
const { dateToString } = require("../../helpers/date");

const transformAnime = anime => {
  return {
    ...anime._doc,
    _id: anime.id,
    date: dateToString(anime._doc.date),
    createdAt: dateToString(anime._doc.createdAt),
    updatedAt: dateToString(anime._doc.updatedAt),
    creator: user.bind(this, anime.creator)
  };
};

const animes = animeIds => {
  return Anime.find({ _id: { $in: animeIds } })
    .then(animes => {
      return animes.map(anime => {
        return transformAnime(anime);
      });
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
        savedAnimes: animes.bind(this, user._doc.savedAnimes)
      };
    })
    .catch(err => {
      throw err;
    });
};

exports.transformAnime = transformAnime;
