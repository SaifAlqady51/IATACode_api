import express, { Request, Response, Application } from "express";
import { run } from "./database/mongodb_connect";
const app: Application = express();

run()
  .then(() => console.log("connected to monogdb"))
  .catch((error) => console.log(error));

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

let port: number = 5555;

app.listen(port, () => {
  console.log(`connected successfully to ${port}`);
});

export default app;
