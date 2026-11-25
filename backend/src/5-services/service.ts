import { ValidationError, UnauthorizedError } from "../3-models/client-errors";
import { PaintingModel, IPaintingModel } from "../3-models/painting-model";
import { IUserModel } from "../3-models/user-model";
import { paintingDAL } from "../4-dal/painting-dal";
import { userDAL } from "../4-dal/user-dal";
import { cyber } from "../2-utils/cyber";

class Service {
    // ============ PAINTINGS ============
    public async getAllPaintings(): Promise<IPaintingModel[]> {
        return paintingDAL.getAllPaintings();
    }

    public async getOnePainting(id: string): Promise<IPaintingModel> {
        return paintingDAL.getOnePaintingById(id);
    }

    public async addPainting(painting: IPaintingModel): Promise<IPaintingModel> {
        return paintingDAL.addPainting(painting);
    }

    public async deletePainting(id: string): Promise<void> {
        return paintingDAL.deletePainting(id);
    }

    public async updatePainting(id: string, painting: Partial<IPaintingModel>): Promise<IPaintingModel> {
        return paintingDAL.updatePainting(id, painting);
    }

    // ============ AUTH ============
    public async register(user: IUserModel): Promise<string> {
        // Check if user already exists
        const existingUser = await userDAL.getUserByEmail(user.email);
        if (existingUser) {
            throw new ValidationError("Email already registered");
        }

        // Hash password
        user.password = await cyber.hashPassword(user.password);
        user.roleId = 2; // User role (not admin)

        // Save user
        const newUser = await userDAL.addUser(user);

        // Generate token
        return cyber.generateToken(newUser._id.toString(), newUser.roleId, newUser);
    }

    public async login(email: string, password: string): Promise<string> {
        // Find user by email
        const user = await userDAL.getUserByEmail(email);
        if (!user) {
            throw new UnauthorizedError("Email or password incorrect"); // TMI prevention
        }

        // Compare passwords
        const isPasswordValid = await cyber.comparePasswords(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedError("Email or password incorrect");
        }

        // Generate token
        return cyber.generateToken(user._id.toString(), user.roleId, user);
    }
}

export const service = new Service();