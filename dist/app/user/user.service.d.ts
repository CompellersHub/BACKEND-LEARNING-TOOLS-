import { UserDocument, UserModel } from "./model";
import { findOneUser } from "./interface";
export declare class UserService {
    private readonly userModel;
    constructor(userModel: typeof UserModel);
    findOne(query: findOneUser): Promise<UserDocument>;
}
