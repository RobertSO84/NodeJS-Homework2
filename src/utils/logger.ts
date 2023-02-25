import { createLogger, transports, format, config } from "winston";

export const logger = createLogger({
  level: "info",
  levels: config.npm.levels,
  format: format.combine(
    format.colorize(),
    format.json(),
    format.errors({ stack: true }),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  // format.combine(format.simple())
  transports: [new transports.Console()],
});
