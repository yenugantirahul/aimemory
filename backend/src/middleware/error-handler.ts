import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app-errors.js";

// Errors from body-parser (malformed JSON, payload too large) carry a status
// and `expose: true`, meaning their message is safe to send to the client.
function isHttpError(
  err: unknown,
): err is { status: number; message: string; expose: boolean } {
  return (
    typeof err === "object" &&
    err !== null &&
    typeof (err as { status?: unknown }).status === "number" &&
    (err as { expose?: unknown }).expose === true
  );
}

export function notFoundHandler(req: Request, _res: Response, next: NextFunction) {
  next(new AppError(404, "NOT_FOUND", `Route ${req.method} ${req.path} not found`));
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
      ...(err.details !== undefined && { details: err.details }),
    });
  }

  if (isHttpError(err)) {
    return res.status(err.status).json({
      code: "BAD_REQUEST",
      message: err.message,
    });
  }

  console.error(err);
  return res.status(500).json({
    code: "INTERNAL_SERVER_ERROR",
    message: "Internal server error",
  });
}
