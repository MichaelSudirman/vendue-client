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
    .catch((err) => err.response.data);
};

export const loginUser = (data, history) => {
  const userData = {
    username: data.username,
    password: data.password,
  };

  return axios
    .post("/login", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.payload.token);
      history.push("/");
      return res.data;
    })
    .catch((err) => err.response.data);
};

const getUserData = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .get("/user")
      .then((res) => {
        resolve({ payload: res.data });
      })
      .catch((err) => console.log(err));
  });
};

const setAuthorizationHeader = (token) => {
  //   const IdToken = token;
  localStorage.setItem("IdToken", token);
  axios.defaults.headers.common["Authorization"] = token;
};
