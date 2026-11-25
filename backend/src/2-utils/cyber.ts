import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

class Cyber {
    // Hash password with bcrypt + salt
    public async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }

    // Compare password with hash
    public async comparePasswords(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    // Generate JWT token
    public generateToken(userId: string, roleId: number, user?: any): string {
        const secretKey = process.env.JWT_SECRET_KEY!;
        const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

        const payload = { userId, roleId, user };
        return jwt.sign(payload, secretKey, { expiresIn } as jwt.SignOptions);
    }

    // Verify JWT token
    public verifyToken(token: string): any {
        try {
            const secretKey = process.env.JWT_SECRET_KEY || "your-secret-key-change-in-env";
            return jwt.verify(token, secretKey);
        } catch (err) {
            return null;
        }
    }
}

export const cyber = new Cyber();
