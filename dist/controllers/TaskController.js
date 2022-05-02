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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
//import { createTaskSchema, updateTaskSchema } from "../models/validators/taskSchemas"
const prisma = new client_1.PrismaClient();
class TaskController {
    constructor() {
        this.getAll = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            const tasks = yield prisma.task.findMany();
            res.json(tasks);
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const task = req.body;
            res.json(Object.assign({ id: 1 }, task));
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const task = req.body;
            res.json(Object.assign({ id: 1 }, task));
        });
        this.update = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            res.json({});
        });
        this.delete = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            res.json({});
        });
    }
}
exports.default = TaskController;
