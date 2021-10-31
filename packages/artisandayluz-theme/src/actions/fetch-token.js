import { fetch } from "frontity";

const fetchToken = async ({ state }) => {
  const res = await fetch(`${state.source.api}jwt-auth/v1/token`, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      username: state.theme.userName,
      password: state.theme.userPass
    }),
    redirect: "follow"
  });
  const body = await res.json();
  state.theme.token = body.token;
};

export default fetchToken;