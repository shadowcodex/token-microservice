const rTracer = require('cls-rtracer')
import { Logger } from "pino";
const logger = require("pino")({
    mixin() {
        return { requestId: rTracer.id() }
    }
}) as Logger;

export default logger