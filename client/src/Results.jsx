import React, { useState } from "react";
import axios from "axios";

const Results = ({ onIds, ids }) => {
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
              <button
                className="btn-add"
                onClick={() => onIds([...ids, r.mal_id])}
              >
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
