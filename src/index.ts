import express, { Request, Response, Application } from "express";

const app:Application = express();

app.get("/", (req:Request, res:Response) => {
  res.send("hello world");
});

let port:number = 5555;

app.listen(port, () => {
  console.log(`connected successfully to ${port}`);
});
