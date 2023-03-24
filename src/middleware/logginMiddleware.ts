import { logger } from "../utils/logger";

export function loggingMiddleware(
  req: {
    method: any;
    url: string;
    body: any;
  },
  _res: any,
  next: () => void
) {
  console.log(
    `Service method ${req.method} ${
      req.url
    } invoked with arguments: ${JSON.stringify(req.body)}`
  );
  next();
}

export function errorHandler(error: Error, _req: any, res: any, next: any) {
  logger.error(error.message, error);
  res.status(500).json({ error: "Internal Server Error" });
  next(error);
}

export function logErrors(
  error: Error,
  req: {
    method: any;
    url: string;
    body: any;
  },
  _res: any
) {
  logger.error(`${req.method} ${JSON.stringify(req.body)} ${error.message}`);
}
