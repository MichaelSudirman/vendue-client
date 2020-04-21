import axios from "axios";
// Components and utils
import { getUnixTime, getISOString } from "../utils/common";

export const createAuction = (data) => {
  const formData = new FormData();
  const unixTime = getUnixTime(data.expiredDate);
  // const ISOTime = getISOString(data.expiredDate);
  let counter = 0;
  formData.append("name", data.name);
  formData.append("initialBid", data.initialBid);
  formData.append("condition", data.condition);
  formData.append("description", data.description);
  formData.append("expiredDate", unixTime);
  data.files.forEach((file) => {
    formData.append(`image ${counter++}`, file);
  });
  // const dateTime = new Date(unixTime * 1000);
  // console.log(unixTime);
  // console.log(dateTime);
  // console.log(data.expiredDate);
  // console.log(new Date(ISOTime));

  return axios
    .post("/auction/create", formData)
    .then((res) => res.data.payload)
    .catch((err) => err.response.data);
};

export const readAuctions = () => {
  return axios
    .get("/auction/unfinished")
    .then((res) => res.data.payload)
    .catch((err) => {
      throw err.response.data;
    });
};
