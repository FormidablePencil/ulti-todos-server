"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const postList_1 = __importDefault(require("./routes/list/postList"));
const deleteList_1 = __importDefault(require("./routes/list/deleteList"));
const deleteRoom_1 = __importDefault(require("./routes/room/deleteRoom"));
const getRoomsByUser_1 = __importDefault(require("./routes/room/getRoomsByUser"));
const postRoom_1 = __importDefault(require("./routes/room/postRoom"));
const signIn_1 = __importDefault(require("./routes/auth/signIn"));
const signUp_1 = __importDefault(require("./routes/auth/signUp"));
/* //* don't add auth yet. Create the logic for Daniel do get and push data. Use only for now but later I'll have to get around doing it . */
mongoose_1.default.set('useCreateIndex', true);
const app = express_1.default();
// app.use(cors())
app.use(express_1.default.json());
app.use('/auth', signIn_1.default, signUp_1.default);
app.use('/room', deleteRoom_1.default, getRoomsByUser_1.default, postRoom_1.default);
app.use('/list', deleteList_1.default, postList_1.default);
mongoose_1.default.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('connected to db'));
mongoose_1.default.connection
    .once('open', () => console.log('connection to mongoDb successful'))
    .on('error', (err) => {
    console.log(err, 'err in connecting to mongoDb');
});
app.listen(process.env.PORT, () => {
    console.log(`server started at http://localhost:${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map