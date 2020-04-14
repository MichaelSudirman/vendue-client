import process from "process";

const isDev = () =>
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const getUrl = () => {
  return isDev ? "http://127.0.0.1:5000" : "https://vendue.herokuapp.com/";
};

export { getUrl };
