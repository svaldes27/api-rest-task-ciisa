"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const healthRoutes_1 = __importDefault(require("./healthRoutes"));
const taskRoutes_1 = __importDefault(require("./taskRoutes"));
const apiRoutes = (0, express_1.Router)();
apiRoutes.use('/', healthRoutes_1.default);
apiRoutes.use('/task', taskRoutes_1.default);
exports.default = apiRoutes;
