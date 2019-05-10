import React, { useState } from "react";
import axios from "axios";

const Results = ({ token }) => {
  const [input, onInput] = useState("");
  const [results, onResults] = useState([]);
  const [loading, onLoading] = useState(false);

  const fetchResults = search => {
    const s = JSON.stringify(search);

    onLoading(true);
    return axios({
      url: "https://graphql.anilist.co",
      method: "post",
      data: {
        query: `
        query {
            Page {
                media(search: ${s}, type: ANIME) {
                  idMal
                  title {
                      romaji
                  }
                    
                }
            }
        }
    `
      }
    }).then(res => {
      onLoading(false);
      onResults(res.data.data.Page.media);
    });
  };

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
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    <div>
      <div>
        <input onChange={e => onInput(e.target.value)} value={input} />
        <button onClick={() => fetchResults(input)}>Search</button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {results.map(r => (
            <div key={r.idMal}>
              <div>{r.title.romaji}</div>
              <button className="btn-add" onClick={() => handleSave(r.idMal)}>
                Add
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Results;
