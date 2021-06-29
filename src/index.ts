/* eslint-disable @typescript-eslint/no-explicit-any */
import * as dotenv from "dotenv";
import app from "./app";
import User from "./db/models/User";

dotenv.config();

declare module "express" {
  export interface Request {
    user?: User;
    // query?: any;
  }
}

const port = process.env.PORT || "8000";

app
  .listen(port, () => {
    console.log(`Server running on port ${port}`);
  })
  .on("error", (error: Error) =>
    console.log("Error starting server:>>", error)
  );
