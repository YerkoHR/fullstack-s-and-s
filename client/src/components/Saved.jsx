import React, { useEffect, useState } from "react";
import axios from "axios";
import { consecutiveRequest } from "../request";

const Saved = () => {
  const [data, onData] = useState([]);
  const [loading, onLoading] = useState(false);

  const fetchSaved = () => {
    onLoading(true);

    return axios({
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
      .then(res => consecutiveRequest(res.data.data.animes))
      .then(res => {
        onLoading(false);
        return onData(res);
      });
  };

  useEffect(() => {
    fetchSaved();
  }, []);

  return (
    <div>
      {!loading ? (
        <div>
          {data.map(data => (
            <div key={data.idMal}>{data.title.romaji}</div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Saved;
