"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const statusCode_1 = __importDefault(require("@utils/http/statusCode"));
// import userService from "../services/userServices";
const userServices_1 = __importDefault(require("@services/userServices"));
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<any>}
 */
const signup = (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        console.log(name, email, password);
        const user = userServices_1.default.signup();
        return user;
    }
    catch (error) {
        return res
            .status(statusCode_1.default.BAD_REQUEST)
            .json({ message: error.message, success: false, code: 400 });
    }
};
exports.signup = signup;
