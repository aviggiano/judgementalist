import express, { Express, Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import config from "./config";
import { getIssue, getIssues, updateIssue, done } from "./database/issues";

dotenv.config();

const app: Express = express();
const port = config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../../frontend", "build")));

app.get("/issues", async (req: Request, res: Response) => {
  res.json(await getIssues());
});

app.get("/issues/:file", async (req: Request, res: Response) => {
  res.json(await getIssue(req.params.file));
});

app.patch("/issues/:file", async (req: Request, res: Response) => {
  res.json(await updateIssue(req.params.file, req.body));
});

app.post("/done", async (req: Request, res: Response) => {
  await done();
  res.json("Done");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
