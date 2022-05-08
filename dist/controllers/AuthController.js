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
const jwt_1 = require("../lib/jwt");
const UserRepository_1 = __importDefault(require("../models/repositories/UserRepository"));
const userSchemas_1 = require("../models/validators/userSchemas");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AuthController {
    constructor() {
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const credentials = req.body;
            try {
                yield userSchemas_1.loginSchema.validateAsync(credentials);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
                return;
            }
            const repository = new UserRepository_1.default();
            try {
                const userFromDataBase = yield repository.findByEmail(credentials.email);
                if (!userFromDataBase || !bcryptjs_1.default.compareSync(credentials.password, userFromDataBase.password)) {
                    res.status(401).json({ message: 'Invalid credentials' });
                    return;
                }
                const token = (0, jwt_1.generateToken)(userFromDataBase);
                res.json({ token });
            }
            catch (error) {
                console.log(error);
                console.log('Error: ', error.code);
                res.status(500).json({ message: 'Something happened' });
            }
        });
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            try {
                yield userSchemas_1.registerSchema.validateAsync(user);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
                return;
            }
            const hashedPassword = bcryptjs_1.default.hashSync(user.password, 12);
            const repository = new UserRepository_1.default();
            try {
                const newUser = yield repository.create(Object.assign(Object.assign({}, user), { password: hashedPassword }));
                res.status(201).json(newUser);
            }
            catch (error) {
                if (error.code === 'P2002') {
                    res.status(409).json({ message: 'This user already exists' });
                    return;
                }
                console.log('Error: ', error.code);
                res.status(500).json({ message: 'Something happened' });
            }
        });
    }
}
exports.default = AuthController;
