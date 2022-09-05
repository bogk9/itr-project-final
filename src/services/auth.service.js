import axios from "axios";
import FormData from 'form-data'

const API_URL = "/api/auth/";
export const register = (username, email, password, file) => {
  let data = new FormData();
  data.append('image', file);
  data.append('username', username);
  data.append('password', password);
  data.append('email', email);

  return axios.post(API_URL + "signup", data, {headers: {
    'accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.8',
    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
  }});
  };
const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));      }
      setTimeout(delay, 100);
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

var delay = () => {
  console.log('');
}

export const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};
