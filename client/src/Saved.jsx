import React, { useEffect, useState } from "react";
import axios from "axios";

const Saved = ({ ids }) => {
  const [data, onData] = useState([]);
  const [loading, onLoading] = useState(false);

  const apiCall = id => {
    return axios.get(`https://api.jikan.moe/v3/anime/${id}`);
  };

  const apiCallFinal = () => {
    const apiArray = ids.map(id => apiCall(id));
    onLoading(true);
    return axios.all(apiArray).then(res => {
      onLoading(false);
      onData(res.map(r => r.data));
      console.log("Data Updated");
    });
  };

  const fetchSaved = () => {
    onLoading(true);

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
            title
            _id
          }
        }
      `
      }
    })
      .then(res => {
        onLoading(false);
        onData(res.data.data.animes);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    //apiCallFinal();
    //}, [ids]);
    fetchSaved();
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data.map(d => (
            <div key={d._id}>{d.title}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Saved;
