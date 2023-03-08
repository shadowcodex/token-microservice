import { getToken, putToken } from "../controllers/serviceController";

const express = require("express");
const router = express.Router();



// PUT new Token
router.post("/:service", putToken);


// Get existing Token
router.get("/:service", getToken)


export {
    router as serviceRouter
}