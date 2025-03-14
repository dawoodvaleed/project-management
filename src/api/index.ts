import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export * from "./fetchData";
export * from "./postData";
export * from "./deleteData";
export * from "./fetchDetails";
export * from "./updateDetails";
