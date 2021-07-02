import * as dotenv from "dotenv";
import CryptoJS from "crypto-js";

dotenv.config();

const { env } = process;

const preRequestScript = (
  method: string,
  data: string,
  urlPath: string
): { salt: CryptoJS.lib.WordArray; timestamp: string; signature: string } => {
  const timestamp = (Math.floor(new Date().getTime() / 1000) - 10).toString();

  const signatureSalt = CryptoJS.lib.WordArray.random(12);

  let body = "";
  if (
    JSON.stringify(data) !== "{}" &&
    data !== "" &&
    typeof data !== "object"
  ) {
    body = JSON.stringify(JSON.parse(data));
  }

  const secret = env.RAPYD_SECRET_KEY;
  const accessKey = env.RAPYD_ACCESS_KEY;

  const toSign =
    method.toLowerCase() +
    "/v1".concat(urlPath) +
    signatureSalt +
    timestamp +
    accessKey +
    secret +
    body;

  let rapydSignature = CryptoJS.enc.Hex.stringify(
    CryptoJS.HmacSHA256(toSign, secret)
  );
  rapydSignature = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(rapydSignature)
  );

  const result = {
    salt: signatureSalt,
    timestamp,
    signature: rapydSignature,
  };

  return result;
};

export default preRequestScript;
