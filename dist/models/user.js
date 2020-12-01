"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    userAccessId: {
        type: String,
        unique: true,
        required: true
    }
});
const UserModel = mongoose_1.default.model('user', UserSchema);
exports.default = UserModel;
//# sourceMappingURL=user.js.map