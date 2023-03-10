import { Request, Response } from "express";
import { JwtPayload, Secret } from "jsonwebtoken";
import { JWTRequest } from "../services/jwt";
import {
  SecretStore,
  SecretStoreResponse,
} from "../services/stores/secret-store";
import logger from "../services/logging";

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
      req.token["applicationID"] as string,
      "github",
      req.token["sub"] as string,
      req.token["serviceID"] as string,
      req.token["serviceToken"] as string
    );
    res.send({ status: "ok" });
  } catch (err) {
    res.send({ status: "error" });
  }
};

const getTokenInternal = async (
  secretStore: SecretStore,
  req: JWTRequest,
  res: Response,
  single: boolean
) => {
  try {
    if (!req.token) {
      throw new Error("Invalid token");
    }
    if (!req.token["sub"]) {
      throw new Error("Invalid subscriber");
    }

    let response: SecretStoreResponse;
    let userid = req.token["sub"] as string;
    let applicationid = req.token["applicationID"] as string;

    if (single) {
      logger.info(
        `single retrieval for app:${applicationid} || user:${userid}`
      );
      response = await secretStore.get(
        applicationid,
        "github",
        userid,
        req.token["serviceID"] as string
      );
    } else {
      logger.info(`multi retrieval for app:${applicationid} || user:${userid}`);
      response = await secretStore.get(applicationid, "github", userid);
    }
    if (response) {
      res.send({ status: "ok", secret: response.response() });
    } else {
      throw new Error("bad secret store retrieval");
    }
  } catch (err) {
    res.send({ status: "error" });
  }
};

const getGithubToken = async (
  secretStore: SecretStore,
  req: JWTRequest,
  res: Response
) => {
  getTokenInternal(secretStore, req, res, true);
};

const getGithubTokenAll = async (
  secretStore: SecretStore,
  req: JWTRequest,
  res: Response
) => {
  getTokenInternal(secretStore, req, res, false);
};

export { putGithubToken, getGithubToken, getGithubTokenAll };
