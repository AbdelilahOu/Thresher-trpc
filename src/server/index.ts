import express, { Application } from "express";
import bodyParser from "body-parser";

const app: Application = express();

app.use(bodyParser.json());
app.use("/trpc");

app.listen(3000, () => {
  console.log("server running on port 3000");
});
