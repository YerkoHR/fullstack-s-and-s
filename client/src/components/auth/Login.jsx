import React, { useState } from "react";
import axios from "axios";

//  THIS API HAVE A LIMIT OF 2 REQ PER SEC AND 30 PER MIN
//  THAT MEANS THAT OUR CONSECUTIVE REQUEST SYSTEM IS NOT GOING TO WORK.

//  ANILIST IS 90 PER MIN.

// I'M GONNA CHANGE TO ANILIST SINCE
// I TECHNICALLY DID THE SAME BUT WITH DIRTIER CODE
// IN THE DASHBOARD.

const Login = ({ onToken }) => {
  const [email, onEmail] = useState("");
  const [password, onPassword] = useState("");

  const submit = (email, password) => {
    const e = JSON.stringify(email);
    const p = JSON.stringify(password);

    axios({
      url: "/graphql",
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        query: `
            query {
              login(email: ${e}, password: ${p}) {
                token
              }
            }
          `
      }
    })
      .then(res => {
        onToken(res.data.data.login.token);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div>
      <input onChange={e => onEmail(e.target.value)} value={email} />
      <input onChange={e => onPassword(e.target.value)} value={password} />

      <button onClick={() => submit(email, password)}>Login</button>
    </div>
  );
};

export default Login;
