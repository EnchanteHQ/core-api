import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const { env } = process;

let database: mongoose.Connection;

const dbURI = env.DB_URI;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: true,
  poolSize: 10,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
};

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

const connect = (): void => {
  const uri: string = dbURI;

  if (database) {
    return;
  }

  mongoose.connect(uri, options);

  database = mongoose.connection;

  database.once("open", async () => {
    try {
      console.log("Mongoose default connection open");
    } catch (error) {
      console.log("Error connecting to DB:", error);
    }
  });

  // database.on("error", (error) => {
  //   console.log("Error connecting to DB:", error);
  // });
};

const disconnect = (): void => {
  if (!database) {
    return;
  }
  console.log(
    "Mongoose default connection disconnected through app termination"
  );
  mongoose.disconnect();
};

export { connect, disconnect };
