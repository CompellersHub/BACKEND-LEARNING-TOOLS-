"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const helpers_1 = require("../../global/helpers");
const services_1 = require("../../global/services");
const argon = __importStar(require("argon2"));
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let AuthService = class AuthService {
    constructor(userModel, mailService) {
        this.userModel = userModel;
        this.mailService = mailService;
    }
    async signup(data) {
        try {
            const user = await this.userModel.findOne({ email: data.email });
            if (user) {
                throw new routing_controllers_1.NotFoundError("Email already exist");
            }
            const password = await argon.hash(data.password);
            const expiredAt = new Date(Date.now() + 10 * 60 * 1000);
            const token = this.generateRandomCode(10);
            const save = { ...data, password, expiredAt, token };
            return this.userModel.create(save).then(async (data) => {
                delete data.password;
                const token = await (0, helpers_1.encryption)(JSON.stringify({
                    email: data.email,
                }));
                await this.mailService.sendEmail(data.email, services_1.template.welcome, "Welcome! Please Verify Your Account", {
                    fullname: data.username,
                    token,
                });
                return data;
            });
        }
        catch (error) {
            throw error;
        }
    }
    async signin(data) {
        try {
            const user = await this.userModel.findOne({ email: data.email });
            if (!user) {
                throw new routing_controllers_1.NotFoundError("Invalid credential");
            }
            const isMatch = await argon.verify(user.password, data.password);
            if (!isMatch) {
                throw new routing_controllers_1.ForbiddenError("Incorrect password");
            }
            delete user.password;
            const token = await this.authorize({
                _id: user._id,
                email: user.email,
                role: user.role,
                username: user.username,
            });
            return { ...user, accessToken: token };
        }
        catch (error) {
            throw error;
        }
    }
    async verified(query) {
        try {
            const decryptToken = await (0, helpers_1.decrypted)(query.token);
            if (!decryptToken || typeof decryptToken !== "string") {
                throw new routing_controllers_1.BadRequestError("Invalid or missing token");
            }
            const parse = await JSON.parse(decryptToken);
            const user = await this.userModel.findOneAndUpdate({
                email: parse.email,
                token: parse.token,
                expiredAt: { $gt: new Date() },
            }, { $set: { verified: true } }, { new: true });
            if (!user) {
                throw new routing_controllers_1.ForbiddenError("token expired or user not found.");
            }
            delete user.password;
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async resendVerificationEmail(data) {
        try {
            await this.sendEmail(data.email);
            return { message: "Verification link sent to your email" };
        }
        catch (error) {
            throw error;
        }
    }
    async forgetPassword(data) {
        const findUser = await this.userModel.findOne({ email: data.email });
        if (!findUser)
            throw new routing_controllers_1.NotFoundError("User not found");
        const token = `https://frontend-reset-password-link.com?email=${data.email}`;
        await this.mailService.sendEmail(findUser.email, services_1.template.forget, "Reset Password", {
            email: findUser.email,
            username: findUser.username,
            token,
            currentYear: new Date().getFullYear(),
        });
        return { message: "Reset password link sent to your email" };
    }
    async resetPassword(data) {
        try {
            const findUser = await this.userModel.findOne({ email: data.email });
            if (!findUser)
                throw new Error("User not found");
            const password = await argon.hash(data.password);
            await this.userModel.updateOne({ _id: findUser._id }, { $set: { password } });
            return { message: "Password reset successfully" };
        }
        catch (error) {
            throw error;
        }
    }
    async sendEmail(email) {
        const expiredAt = new Date(Date.now() + 10 * 60 * 1000);
        const code = this.generateRandomCode(10);
        const token = await (0, helpers_1.encryption)(JSON.stringify({ token: code, email }));
        const user = await this.userModel.findOne({ email });
        if (!user)
            return;
        await Promise.all([
            this.userModel.findOneAndUpdate({ email }, { $set: { token: code, expiredAt } }, { new: true }),
            this.mailService.sendEmail(email, services_1.template.resend, "Verify Your Account – Action Needed", {
                fullname: user.username,
                token,
            }),
        ]);
        return;
    }
    async authorize(data) {
        return jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET, { expiresIn: "24h" });
    }
    generateRandomCode(length) {
        const bytes = new Uint8Array(length);
        crypto.getRandomValues(bytes);
        return Array.from(bytes)
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)("userModel")),
    __metadata("design:paramtypes", [Object, services_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map