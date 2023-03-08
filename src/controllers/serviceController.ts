import { Request, Response } from "express";
import { getGithubToken, putGithubToken } from "./githubController";

const putToken = async (req: Request, res: Response) => {
    let service = req.params["service"]
    switch(service.toLowerCase()) {
        case "github": {
            putGithubToken(req, res)
        }
    }
}

const getToken = async (req: Request, res: Response) => {
    let service = req.params["service"]
    switch(service.toLowerCase()) {
        case "github": {
            getGithubToken(req, res)
        }
    }
}

export {
    putToken,
    getToken
}