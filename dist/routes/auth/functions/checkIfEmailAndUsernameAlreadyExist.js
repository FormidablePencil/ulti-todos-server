"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../../models/user"));
const checkIfEmailAndUsernameAlreadyExist = (username, email) => __awaiter(void 0, void 0, void 0, function* () {
    const usernameAlready = yield user_1.default.findOne({ username });
    if (usernameAlready)
        return {
            alreadyExists: true,
            response: 'username already exists'
        };
    const foundExistingUsersByEmail = yield user_1.default.findOne({ email });
    if (foundExistingUsersByEmail)
        return {
            alreadyExists: true,
            response: 'an email already is used by another account'
        };
    return { alreadyExists: false, };
});
exports.default = checkIfEmailAndUsernameAlreadyExist;
//# sourceMappingURL=checkIfEmailAndUsernameAlreadyExist.js.map