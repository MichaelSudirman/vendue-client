import axios from "axios";

export const signupUser = (data) => {
  const newUserData = {
    username: data.username,
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
  };

  return axios
    .post("/register", newUserData)
    .then((res) => res.data)
    .catch((err) => {
      throw err.response.data;
    });
};

export const loginUser = (data) => {
  const userData = {
    username: data.username,
    password: data.password,
  };

  return axios
    .post("/login", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.payload.token);
      window.location.href = "/";
      return res.data;
    })
    .catch((err) => {
      throw err.response.data;
    });
};

export const logoutUser = () => {
  localStorage.removeItem("Authorization");
  delete axios.defaults.headers.common["Authorization"];
  window.location.href = "/";
};

const setAuthorizationHeader = (token) => {
  localStorage.setItem("Authorization", token);
  axios.defaults.headers.common["Authorization"] = token;
};
