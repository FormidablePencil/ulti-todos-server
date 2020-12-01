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
const authUser_1 = __importDefault(require("../../middleware/authUser"));
const room_1 = __importDefault(require("../../models/room"));
const signIn = express_1.default.Router();
// userAccessId
signIn.post('/signIn', authUser_1.default, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userAccessId } = req.body;
    const foundRooms = yield room_1.default.find({ users: userAccessId });
    const foundLists = yield room_1.default.find({ users: userAccessId });
    res.status(202).send({ foundRooms, foundLists });
}));
exports.default = signIn;
//# sourceMappingURL=signIn.js.map