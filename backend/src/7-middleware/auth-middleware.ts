import { Request, Response, NextFunction } from "express";
import { cyber } from "../2-utils/cyber";
import { UnauthorizedError } from "../3-models/client-errors";

export interface AuthenticatedRequest extends Request {
    userId?: string;
    roleId?: number;
}

class AuthMiddleware {
    public authenticate = (request: AuthenticatedRequest, response: Response, next: NextFunction) => {
        try {
            // Get token from Authorization header
            const authHeader = request.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                throw new UnauthorizedError("Missing or invalid token");
            }

            // Extract token
            const token = authHeader.substring(7);

            // Verify token
            const payload = cyber.verifyToken(token);
            if (!payload) {
                throw new UnauthorizedError("Invalid token");
            }

            // Attach user info to request
            request.userId = payload.userId;
            request.roleId = payload.roleId;

            next();
        } catch (err: any) {
            next(err);
        }
    };
}

export const authMiddleware = new AuthMiddleware();
