import { Request, Response } from "express";
import { JWTRequest } from "../services/jwt";
import {
  SecretStore,
  SecretStoreResponse,
} from "../services/stores/secret-store";
import logger from "../services/logging";
import { ServiceController } from "./serviceController";

class GithubController implements ServiceController {
  async putToken(req: JWTRequest, res: Response) {
    let secretStore = req.app.get("secretStore") as SecretStore;
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
  }

  async getTokenInternal (
    req: JWTRequest,
    res: Response,
    single: boolean
  ) {
    let secretStore = req.app.get("secretStore") as SecretStore;
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

  async getToken (
    req: JWTRequest,
    res: Response
  ) {
    this.getTokenInternal(req, res, true);
  };

  async getTokenAll (
    req: JWTRequest,
    res: Response
  ) {
    this.getTokenInternal(req, res, false);
  };
}



export {GithubController };
