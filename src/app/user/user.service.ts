import { Inject, Service } from "typedi";
import { UserDocument, UserModel } from "./model";
import { findOneUser } from "./interface";

@Service()
export class UserService {
  constructor(
    @Inject("userModel") private readonly userModel: typeof UserModel
  ) {}

  async findOne(query: findOneUser): Promise<UserDocument> {
    return;
  }
}
