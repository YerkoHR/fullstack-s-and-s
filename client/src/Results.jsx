import React, { useState } from "react";
import axios from "axios";

// HERE WE RECEIVE AN AUTH ERROR BECAUSE THE TOKEN IS CHANGED AFTER 1 HOUR
// SO THE ONE IN THE BOTTOM IS EXPIRED.

const Results = () => {
  const [input, onInput] = useState("");
  const [results, onResults] = useState([]);
  const [loading, onLoading] = useState(false);

  const fetchResults = query => {
    onLoading(true);
    return axios
      .get(`https://api.jikan.moe/v3/search/anime?q=${query}&page=1`)
      .then(res => {
        onLoading(false);
        onResults(res.data.results);
      });
  };

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1Y2NlMzJkNzBkYzZhYzBkNzg4MGFhYTIiLCJlbWFpbCI6IjEyM0AxMjMuY29tIiwiaWF0IjoxNTU3MTM1NDIzLCJleHAiOjE1NTcxMzkwMjN9.Ws1efMKbBH2GO90ZVwImtcDjfGiCM5w-gJA32lC7m7s";

  const handleSave = id => {
    axios({
      url: "/graphql",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      data: {
        query: `
        mutation {
          saveAnime(id: ${id}) {
            mal_id
          }
        }
      `
      }
    })
      .then(res => {
        onLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <input onChange={e => onInput(e.target.value)} value={input} />
        <button onClick={() => fetchResults(input)}>Search</button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {results.map(r => (
            <>
              <div>{r.title}</div>
              <button className="btn-add" onClick={() => handleSave(r.mal_id)}>
                Add
              </button>
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default Results;
