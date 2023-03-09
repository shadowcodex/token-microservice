import { Request, Response } from "express";
import { JWTRequest } from "../services/jwt";
import { SecretStore } from "../services/stores/secret-store";
import { getGithubToken, putGithubToken } from "./githubController";

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
  switch (service.toLowerCase()) {
    case "github": {
      getGithubToken(secretStore, req, res);
    }
  }
};

export { putToken, getToken };
