import { Request, Response } from "express";
import SecretStore from "../services/stores/secret-store";

const putGithubToken = async (req: Request, res: Response) => {
  let secretStore = req.app.get("secretStore") as SecretStore;
  secretStore.put("test", "item");
  res.send("ok");
};

const getGithubToken = async (req: Request, res: Response) => {
  let secretStore = req.app.get("secretStore") as SecretStore;
  secretStore.put("test", "item");
  let resposnse = secretStore.get("test")
  res.send(resposnse);
};

export { putGithubToken, getGithubToken };
