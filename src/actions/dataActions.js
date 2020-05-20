import axios from "axios";
// Components and utils
import { getUnixTime } from "../utils/common";

// Create an auction
export const createAuction = data => {
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

// Read one detailed auction
export const readAuction = dataUrl => {
  return axios
    .get(`/auction/${dataUrl}/detail`)
    .then(res => res.data.payload)
    .catch(err => {
      throw err.response.data
    })
}
// Read multiple auctions
export const readAuctions = () => {
  return axios
    .get("/auction/unfinished")
    .then((res) => res.data.payload)
    .catch((err) => {
      throw err.response.data;
    });
};
// Read user involved auctions
export const userAuctions = () =>{
  return axios
  .get('/auction/myauctions')
  .then(res=> res.data.payload)
  .catch(err=>{
    throw err.response.data;
  })
}
// Read liked auctions
export const likedAuctions = () =>{
  return axios
  .get('/auction/likedauctions')
  .then(res=> res.data.payload)
  .catch(err=>{
    throw err.response.data;
  })
}
// Search auctions
export const searchAuctions = dataUrl => {
  return axios
    .get(`/auction/name=${dataUrl}`)
    .then(res => res.data.payload)
    .catch(err => {
      throw err.response.data
    })
}


// Create and read comment(s)
export const createComment = (auctionId, commentInput) => {
  console.log(commentInput)
  const data = { 'data': commentInput }
  return axios
    .post(`/auction/${auctionId}/comment`, data)
    .then(res => res.data.payload)
    .catch(err => {
      throw err.response.data
    })
}
export const readComments = auctionId => {
  return axios
    .get(`/auction/${auctionId}/comments`)
    .then(res => res.data.payload)
    .catch(err => {
      throw err.response.data
    })
}

// Like and unlike auction
export const likeAuction = auctionId => {
  return axios
    .get(`/auction/${auctionId}/like`)
    .then(res => res.data.payload)
    .catch(err => {
      throw err.response.data
    })
}
export const unlikeAuction = auctionId => {
  return axios
    .get(`/auction/${auctionId}/unlike`)
    .then(res => res.data.payload)
    .catch(err => {
      throw err.response.data
    })
}