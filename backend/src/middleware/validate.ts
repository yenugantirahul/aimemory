import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { AppError } from "../errors/app-errors.js";

interface RequestSchemas {
  body?: z.ZodType;
  params?: z.ZodType;
  query?: z.ZodType;
}

// Validates and replaces req.body / req.params / req.query with the parsed
// (trimmed, coerced, defaulted) values. Responds 400 on the first failure.
export function validate(schemas: RequestSchemas) {
  return (req: Request, _res: Response, next: NextFunction) => {
    for (const key of ["params", "query", "body"] as const) {
      const schema = schemas[key];
      if (!schema) continue;

      const result = schema.safeParse(req[key]);

      if (!result.success) {
        throw new AppError(400, "VALIDATION_ERROR", "Invalid request", {
          location: key,
          issues: result.error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      // Express 5 exposes req.query as a getter, so it can't be assigned.
      Object.defineProperty(req, key, {
        value: result.data,
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }

    next();
  };
}
