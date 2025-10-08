"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResendEmailVerification = exports.VerifyEmail = exports.ForgetPassword = exports.ResetPassword = exports.Login = exports.Register = void 0;
const class_validator_1 = require("class-validator");
const interface_1 = require("../../../app/user/interface");
class Register {
    constructor() {
        this.role = interface_1.Role.student;
    }
}
exports.Register = Register;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Register.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Register.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsStrongPassword)({
        minLength: 8,
        minLowercase: 1,
        minSymbols: 1,
        minNumbers: 1,
        minUppercase: 1,
    }, {
        message: "Include atleast one number, one lowercase letter, one uppercase letter, one symbol and upto 8 in length ",
    }),
    __metadata("design:type", String)
], Register.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(Object.values(interface_1.Role)),
    __metadata("design:type", String)
], Register.prototype, "role", void 0);
class Login {
}
exports.Login = Login;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Login.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsStrongPassword)({
        minLength: 8,
        minLowercase: 1,
        minSymbols: 1,
        minNumbers: 1,
        minUppercase: 1,
    }, {
        message: "Include atleast one number, one lowercase letter, one uppercase letter, one symbol and upto 8 in length ",
    }),
    __metadata("design:type", String)
], Login.prototype, "password", void 0);
class ResetPassword extends Login {
}
exports.ResetPassword = ResetPassword;
class ForgetPassword {
}
exports.ForgetPassword = ForgetPassword;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ForgetPassword.prototype, "email", void 0);
class VerifyEmail {
}
exports.VerifyEmail = VerifyEmail;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], VerifyEmail.prototype, "token", void 0);
class ResendEmailVerification {
}
exports.ResendEmailVerification = ResendEmailVerification;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ResendEmailVerification.prototype, "email", void 0);
//# sourceMappingURL=index.js.map