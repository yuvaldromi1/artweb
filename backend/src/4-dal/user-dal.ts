import { UserModel, IUserModel } from "../3-models/user-model";
import { ResourceNotFoundError } from "../3-models/client-errors";

class UserDAL {
    public async getUserByEmail(email: string): Promise<IUserModel | null> {
        return UserModel.findOne({ email }).exec();
    }

    public async getUserById(id: string): Promise<IUserModel> {
        const user = await UserModel.findById(id).select("-password").exec();
        if (!user) {
            throw new ResourceNotFoundError(parseInt(id));
        }
        return user;
    }

    public async addUser(user: IUserModel): Promise<IUserModel> {
        return UserModel.create(user);
    }

    public async getAllUsers(): Promise<IUserModel[]> {
        return UserModel.find().select("-password").exec();
    }

    public async deleteUser(id: string): Promise<void> {
        const result = await UserModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new ResourceNotFoundError(parseInt(id));
        }
    }
}

export const userDAL = new UserDAL();
