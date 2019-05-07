import React, { useEffect, useState } from "react";
import axios from "axios";

// TO DO: ADD AN ANIME ID WITH POSTMAN AND CHECK IT THIS
// ASYNC DOUBLE FETCH WORK. -> one punch mal id:  34134

const Saved = () => {
  const [data, onData] = useState([]);
  const [loading, onLoading] = useState(false);

  const apiCall = id => {
    return axios.get(`https://api.jikan.moe/v3/anime/${id}`);
  };

  const apiCallFinal = ids => {
    const apiArray = ids.map(id => apiCall(id.mal_id));
    onLoading(true);
    return axios.all(apiArray).then(res => {
      onLoading(false);
      onData(
        res.map((r, i) => {
          return { ...r.data, dbId: ids[i]._id };
        })
      );
    });
  };

  const fetchSaved = () => {
    axios({
      url: "/graphql",
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        query: `
        query {
          animes {
            mal_id
            _id
          }
        }
      `
      }
    })
      .then(res => {
        apiCallFinal(res.data.data.animes);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data.map(d => (
            <div key={d.dbId}>{d.mal_id}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Saved;
