import pino from "pino";

const isProduction = process.env.NODE_ENV === "production";

const logger = pino({
  level: isProduction ? "info" : "debug",
});

export default logger;
