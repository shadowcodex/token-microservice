import { Request, Response } from "express";
import {SecretStore} from "../services/stores/secret-store";

const putGithubToken = async (secretStore: SecretStore, req: Request, res: Response) => {
  try {
    secretStore.put("test", "item");
    res.send({ status: "ok" });
  } catch {
    res.send({ status: "error" });
  }
};

const getGithubToken = async (secretStore: SecretStore, req: Request, res: Response) => {
  try {
    secretStore.put("test", "item");
    let response = await secretStore.get("test");
    res.send({ status: "ok", secret: response });
  } catch {
    res.send({ status: "error" });
  }
};

export { putGithubToken, getGithubToken };
