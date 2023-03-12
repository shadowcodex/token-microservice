import { NextFunction, Request, Response } from "express";
import { JWTRequest } from "../services/jwt";
import logger from "../services/logging";
import { GithubController } from "./githubController";
import { SlackController } from "./slackController";

interface ServiceController {
  putToken: (req: JWTRequest, res: Response, next?: NextFunction) => void;
  getToken: (req: JWTRequest, res: Response, next?: NextFunction) => void;
  getTokenAll: (req: JWTRequest, res: Response, next?: NextFunction) => void;
  getTokenInternal: (req: JWTRequest, res: Response, single: boolean) => void;
}

const controllers = {
  'github': new GithubController(),
  'slack': new SlackController()
}

const putToken = async (req: JWTRequest, res: Response) => {
  let service = req.params["service"];
  if(service in controllers) {
    (controllers[service] as ServiceController).putToken(req, res)
  }

};

const getToken = async (req: JWTRequest, res: Response) => {
  let service = req.params["service"];
  let serviceid = req.token["serviceID"] as string;

  if (!serviceid) {
    logger.warn("getToken - no service id when required");
    res.send({
      status:
        "error - no service id supplied. Needed for single token retrieval.",
    });
    return;
  }

  if(service in controllers) {
    (controllers[service] as ServiceController).getToken(req, res)
  }

};

const getTokenAll = async (req: JWTRequest, res: Response) => {
  let service = req.params["service"];

  if(service in controllers) {
    (controllers[service] as ServiceController).getTokenAll(req, res)
  }
};

export { putToken, getToken, getTokenAll, ServiceController };
