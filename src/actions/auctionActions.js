import axios from "axios";
// Components and utils
import { getUnixTime, getISOString } from "../utils/common";

export const createAuction = (data) => {
  return new Promise((resolve, reject) => {
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
    axios
      .post("/test/requestcheck", formData)
      .then((res) => resolve(res))
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.error);
        reject(err.response);
      });
  });
};

export const readAuctions = () => {
  return new Promise((resolve, reject) => {
    console.log('calling');
    axios
      .get("/auction/all")
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err.response));
  });
};

