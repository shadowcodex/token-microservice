import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { JWTRequest } from "../services/jwt";
import { SecretStore } from "../services/stores/secret-store";

const putGithubToken = async (
  secretStore: SecretStore,
  req: JWTRequest,
  res: Response
) => {
  try {
    if (!req.token) {
      throw new Error("Invalid token");
    }
    if (!req.token["sub"]) {
      throw new Error("Invalid subscriber");
    }
    if (!req.token["serviceToken"]) {
      throw new Error("No service token to store");
    }

    secretStore.put(
      req.token["sub"] as string,
      req.token["serviceToken"] as string
    );
    res.send({ status: "ok" });
  } catch (err) {
    res.send({ status: "error" });
  }
};

const getGithubToken = async (
  secretStore: SecretStore,
  req: JWTRequest,
  res: Response
) => {
  try {
    if (!req.token) {
      throw new Error("Invalid token");
    }
    if (!req.token["sub"]) {
      throw new Error("Invalid subscriber");
    }
    let response = await secretStore.get(req.token["sub"] as string);
    res.send({ status: "ok", secret: response });
  } catch {
    res.send({ status: "error" });
  }
};

export { putGithubToken, getGithubToken };
