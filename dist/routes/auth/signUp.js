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
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../../models/user"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const signUp = express_1.default.Router();
signUp.post('/signUp', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    if (!username || !password || !email)
        return res.status(400).send('missing fields');
    const usernameAlready = yield user_1.default.findOne({ username });
    if (usernameAlready)
        return res.status(400).send('username already exists');
    const foundExistingUsersByEmail = yield user_1.default.findOne({ email });
    if (foundExistingUsersByEmail)
        return res.status(400).send('an email already is used by another account');
    const encryptedPw = yield bcrypt_1.default.hash(password, 10);
    const createdNewUser = new user_1.default({
        username,
        password: encryptedPw,
        email,
        userAccessId: uuid_1.v4()
    });
    try {
        yield createdNewUser.save();
    }
    catch (error) {
        return res.status(500).send(error);
    }
    // * create dummy data; 1 room. 1 todo */
    res.status(202).send('created new user');
}));
exports.default = signUp;
//# sourceMappingURL=signUp.js.map