import axios from "axios";
// Components and utils
import { getUnixTime } from "../utils/common";

export const createAuction = (data) => {
  const formData = new FormData();
  const unixTime = getUnixTime(data.expiredDate);
  let counter = 0;
  formData.append("name", data.name);
  formData.append("initialBid", data.initialBid);
  formData.append("condition", data.condition);
  formData.append("description", data.description);
  formData.append("expiredDate", unixTime);
  data.files.forEach((file) => {
    formData.append(`image ${counter++}`, file);
  });

  return axios
    .post("/auction/create", formData)
    .then((res) => res.data.payload)
    .catch((err) => {
      throw err.response.data;
    });
};

export const readAuctions = () => {
  return axios
    .get("/auction/unfinished")
    .then((res) => res.data.payload)
    .catch((err) => {
      throw err.response.data;
    });
};
