import { Request, Response } from "express";
import { JWTRequest } from "../services/jwt";
import { SecretStore } from "../services/stores/secret-store";
import {
  getGithubToken,
  getGithubTokenAll,
  putGithubToken,
} from "./githubController";
import logger from "../services/logging";

const putToken = async (req: JWTRequest, res: Response) => {
  let service = req.params["service"];
  let secretStore = req.app.get("secretStore") as SecretStore;
  switch (service.toLowerCase()) {
    case "github": {
      putGithubToken(secretStore, req, res);
    }
  }
};

const getToken = async (req: JWTRequest, res: Response) => {
  let service = req.params["service"];
  let secretStore = req.app.get("secretStore") as SecretStore;

  let serviceid = req.token["serviceID"] as string;

  if (!serviceid) {
    logger.warn("getToken - no service id when required");
    res.send({
      status:
        "error - no service id supplied. Needed for single token retrieval.",
    });
    return;
  }
  switch (service.toLowerCase()) {
    case "github": {
      getGithubToken(secretStore, req, res);
    }
  }
};

const getTokenAll = async (req: JWTRequest, res: Response) => {
  let service = req.params["service"];
  let secretStore = req.app.get("secretStore") as SecretStore;
  switch (service.toLowerCase()) {
    case "github": {
      getGithubTokenAll(secretStore, req, res);
    }
  }
};

export { putToken, getToken, getTokenAll };
