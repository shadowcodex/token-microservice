import { getToken, getTokenAll, putToken } from "../controllers/serviceController";

const express = require("express");
const router = express.Router();

// PUT new Token
router.post("/:service", putToken);

// Get existing Token
router.get("/:service/one", getToken);
router.get("/:service/all", getTokenAll);

export { router as serviceRouter };
