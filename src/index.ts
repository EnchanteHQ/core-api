import express from "express";

const app = express();
const port = 8000;

app.get("/", (_, res) => {
  res.send("Enchante");
});

app
  .listen(port, () => {
    console.log(`Server running on port ${port}`);
  })
  .on("error", (error: Error) =>
    console.log("Error starting server:>>", error)
  );
