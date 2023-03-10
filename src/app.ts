import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { serviceRouter } from "./routes/serviceRoutes";
import { getJWKS, validateJWT } from "./services/jwt";
import getSecretStore from "./services/secrets";
const rTracer = require('cls-rtracer')
const app = express();

app.use(rTracer.expressMiddleware())

// Setup Providers
let secretStore = getSecretStore();
let jwksClient = getJWKS();

app.set("jwksClient", jwksClient);
app.set("secretStore", secretStore);
app.use(validateJWT);
app.use("/service", serviceRouter);

export default app;
