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
const TaskRepository_1 = __importDefault(require("../models/repositories/TaskRepository"));
const taskSchemas_1 = require("../models/validators/taskSchemas");
class TaskController {
    constructor() {
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const repository = new TaskRepository_1.default(user.sub);
            try {
                const tasks = yield repository.findAll();
                res.json(tasks);
            }
            catch (error) {
                console.log(error);
                console.log('Error: ', error.code);
                res.status(500).json({ message: 'Something happened' });
            }
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = req.user;
            const repository = new TaskRepository_1.default(user.sub);
            try {
                const task = yield repository.findById(parseInt(id));
                if (!task) {
                    res.status(404).json({ message: 'Task not found' });
                    return;
                }
                res.json(task);
            }
            catch (error) {
                console.log(error);
                console.log('Error: ', error.code);
                res.status(500).json({ message: 'Something happened' });
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const task = req.body;
            try {
                yield taskSchemas_1.createTaskSchema.validateAsync(task);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
                return;
            }
            const user = req.user;
            const repository = new TaskRepository_1.default(user.sub);
            try {
                const newTask = yield repository.create(task);
                res.json(newTask);
            }
            catch (error) {
                if (error.code === 'P2002') {
                    res.status(409).json({ message: 'This task already exists' });
                    return;
                }
                console.log('Error: ', error.code);
                res.status(500).json({ message: 'Something happened' });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const task = req.body;
            try {
                yield taskSchemas_1.updateTaskSchema.validateAsync(task);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
                return;
            }
            const user = req.user;
            const repository = new TaskRepository_1.default(user.sub);
            try {
                yield repository.update(parseInt(id), task);
                res.sendStatus(204);
            }
            catch (error) {
                if (error.code === 'P2002') {
                    res.status(409).json({ message: 'This task already exists' });
                    return;
                }
                console.log('Error: ', error.code);
                res.status(500).json({ message: 'Something happened' });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = req.user;
            const repository = new TaskRepository_1.default(user.sub);
            try {
                yield repository.delete(parseInt(id));
                res.sendStatus(204);
            }
            catch (error) {
                console.log(error);
                console.log('Error: ', error.code);
                res.status(500).json({ message: 'Something happened' });
            }
        });
    }
}
exports.default = TaskController;
