import { Request, Response, NextFunction } from "express";
import { auth } from "../auth.js";

export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const session = await auth.api.getSession({
        headers: req.headers,
    });

    if (!session) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    // Make the user available to later handlers
    req.user = session.user;

    next();
}