import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import config from "./config";
import { getIssue, getIssues, updateIssue } from "./database/issues";

dotenv.config();

const app: Express = express();
const port = config.port;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/issues", async (req: Request, res: Response) => {
  res.json(await getIssues());
});

app.get("/issues/:file", async (req: Request, res: Response) => {
  res.json(await getIssue(req.params.file));
});

app.patch("/issues/:file", async (req: Request, res: Response) => {
  res.json(await updateIssue(req.params.file, req.body));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
