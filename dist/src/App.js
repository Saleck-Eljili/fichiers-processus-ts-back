"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const Routers_1 = __importDefault(require("./Routers"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.initServer = () => {
            const port = 8060 || process.env.PORT;
            this.app.listen(port, () => console.log("server listening on port %d", port));
        };
        this.Config();
        this.ConfigRouters();
        this.initServer();
    }
    Config() {
        this.app.use((0, cors_1.default)());
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
    }
    ConfigRouters() {
        this.app.use('/api/v1/', Routers_1.default);
    }
}
exports.default = new App();
//# sourceMappingURL=App.js.map