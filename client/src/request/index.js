import axios from "axios";

const request = id => {
  return axios({
    url: "https://graphql.anilist.co",
    method: "post",
    data: {
      query: `
      query {
        Media(idMal: ${id}){
          title {
            romaji
          }
          idMal
        }
      }`
    }
  });
};

export const consecutiveRequest = ids => {
  const apiArray = ids.map(id => request(id.mal_id));

  return axios.all(apiArray).then(res => res.map(r => r.data.data.Media));
};
