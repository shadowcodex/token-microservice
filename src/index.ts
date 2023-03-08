import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import { serviceRouter } from "./routes/serviceRoutes";
import getSecretStore from "./services/secrets";
const app = express();
const port = 3000;

// Setup Providers
let secretStore = getSecretStore();

app.set("secretStore", secretStore)
app.use("/service", serviceRouter)

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
