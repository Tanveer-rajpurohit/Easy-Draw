"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const socket_1 = require("./config/socket");
const authRouter_1 = __importDefault(require("./router/authRouter"));
require("./config/googleAuth");
const mongoose_1 = __importDefault(require("mongoose"));
const teamRouter_1 = __importDefault(require("./router/teamRouter"));
const fileRouter_1 = __importDefault(require("./router/fileRouter"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
(0, socket_1.setupSocket)(server);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(passport_1.default.initialize());
//connect to mongodb
mongoose_1.default.connect(process.env.MONGO_URI);
app.use('/auth', authRouter_1.default);
app.use('/team', teamRouter_1.default);
app.use('/file', fileRouter_1.default);
app.use('/user', userRouter_1.default);
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
