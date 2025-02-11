import axios from "axios";

const AUTH_CONSTANTS = {
  apiKey: "AIzaSyApppaErLjOOsgOrp6qpUPDg_9ehf6c2Pc",
  baseURL: "https://identitytoolkit.googleapis.com/v1/accounts",
};

async function authenticate(mode, email, password) {
  const url = `${AUTH_CONSTANTS.baseURL}:${mode}?key=${AUTH_CONSTANTS.apiKey}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  return response.data.idToken;
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}