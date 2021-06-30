import axios from "axios";

import * as dotenv from "dotenv";
import preRequestScript from "../helpers/preRequestScript";

dotenv.config();

const { env } = process;

const RapydApi = axios.create({
  baseURL: "https://sandboxapi.rapyd.net/v1",
  headers: {
    "Content-Type": "application/json",
    access_key: env.RAPYD_ACCESS_KEY,
    salt: "",
    timestamp: "",
    signature: "",
  },
});

RapydApi.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const { method, data = {} } = config;
    const urlPath = config.url;

    const requiredHeaders = preRequestScript(method, data, urlPath);

    config.headers.salt = requiredHeaders.salt;
    config.headers.timestamp = requiredHeaders.timestamp;
    config.headers.signature = requiredHeaders.signature;
    return config;
  },
  (error) => {
    // Do something with request error
    console.error("Error with Rapyd Api Interceptor");

    Promise.reject(error);
  }
);

export default RapydApi;
