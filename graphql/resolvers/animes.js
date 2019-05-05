const Anime = require("../../models/anime");
const User = require("../../models/user");
const { transformAnime } = require("./merge");

module.exports = {
  animes: () => {
    return Anime.find()
      .populate("creator")
      .then(animes => {
        return animes.map(anime => {
          return transformAnime(anime);
        });
      })
      .catch(err => {
        throw err;
      });
  },
  saveAnime: (args, req) => {
    if (!req.isAuth) {
      throw new Error("Not authenticated");
    }

    const {
      title,
      synopsis,
      image,
      broadcast,
      format,
      status,
      source,
      episodes,
      score,
      genres,
      date
    } = args.animeInput;

    const anime = new Anime({
      title,
      synopsis,
      image,
      broadcast,
      format,
      status,
      source,
      episodes,
      score,
      genres,
      date: new Date(date),
      creator: req.userId
    });
    let savedAnime;
    return anime
      .save()
      .then(res => {
        savedAnime = transformAnime(res);
        return User.findById(req.userId);
      })
      .then(user => {
        if (!user) {
          throw new Error("User not found.");
        }
        user.savedAnime.push(anime);
        return user.save();
      })
      .then(res => {
        return savedAnime;
      })
      .catch(err => {
        throw err;
      });
  }
};
