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
const postRoom = express_1.default.Router();
postRoom.post('/', authUser_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userAccessId, room: { title, users } } = req.body;
    users.push(userAccessId);
    const rooms = new room_1.default({ title, users });
    try {
        yield rooms.save();
        res.status(202).send('Saved new room!');
    }
    catch (error) {
        console.log(error);
        res.status(400).send('something went wrong');
    }
}));
exports.default = postRoom;
//# sourceMappingURL=postRoom.js.map