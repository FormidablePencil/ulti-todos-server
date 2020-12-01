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
const list_1 = __importDefault(require("../../models/list"));
const room_1 = __importDefault(require("../../models/room"));
const generateStarterData = (createdUserAccessId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdStarterList = new list_1.default({
        // listId: Array,
        // title: String,
        // todos: 'try inviting someone into your room',
        // keysOfLists: [createdUserAccessId],
        });
        const createdStarterRoom = new room_1.default({
            title: 'Starter',
            users: [createdUserAccessId],
            keysOfLists: [],
        });
        yield createdStarterRoom.save();
        yield createdStarterList.save();
        return { generated: true };
    }
    catch (error) {
        return { generated: false, error };
    }
});
exports.default = generateStarterData;
//# sourceMappingURL=generateStarterData.js.map