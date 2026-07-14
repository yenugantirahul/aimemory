import { Request, Response, NextFunction } from "express";
import { auth } from "../auth.js";

export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const headers = new Headers();

    for (const [key, value] of Object.entries(req.headers)) {
        if (typeof value === "string") {
            headers.append(key, value);
        } else if (Array.isArray(value)) {
            value.forEach((v) => headers.append(key, v));
        }
    }

    const session = await auth.api.getSession({
        headers,
    });

    if (!session) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    req.user = session.user;

    next();
}