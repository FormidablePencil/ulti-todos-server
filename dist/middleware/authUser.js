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
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const authUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, token } = req.body;
    const foundUser = yield user_1.default.findOne({ username });
    if (!foundUser)
        return res.status(404).send('user does not exist');
    if (!bcrypt_1.default.compare(token, foundUser.password)) {
        return res.status(400).send('incorrect username or password');
    }
    req.body.userAccessId = foundUser.userAccessId;
    next();
});
exports.default = authUser;
//# sourceMappingURL=authUser.js.map