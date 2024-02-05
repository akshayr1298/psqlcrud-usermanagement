"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const statusCode_1 = __importDefault(require("@utils/http/statusCode"));
const verifyToken = (req, res, next) => {
    try {
        console.log("cookies", req.cookies);
        const token = req.cookies.access_token;
        const refreshToken = req.cookies.refresh_token;
        console.log("token", token, "refresh", refreshToken);
        if (!token) {
            return res
                .status(statusCode_1.default.UNAUTHORIZED)
                .json({ message: "You are not authenticated" });
        }
        let secret = process.env.JWT_SECRET;
        // type UserType = {
        //     email: string;
        //   };
        jsonwebtoken_1.default.verify(token, secret, (err, user) => {
            console.log("user", user);
            if (err) {
                console.log("errname", err.name);
                if (err.name === "TokenExpiredError") {
                    // Access token has expired, try to refresh it
                    jsonwebtoken_1.default.verify(refreshToken, secret, (err, user) => {
                        if (err) {
                            return res
                                .status(statusCode_1.default.UNAUTHORIZED)
                                .json({ message: "Invalid refresh token" });
                        }
                        // Generate a new access token
                        const newAccessToken = jsonwebtoken_1.default.sign({ email: user.email }, secret, {
                            expiresIn: "15m",
                        });
                        // Set the new access token in the response cookies
                        res.cookie("access_token", newAccessToken, {
                            maxAge: 600000,
                            httpOnly: true,
                        });
                        // Proceed to the next middleware
                        req.user = user;
                        next();
                    });
                }
                else {
                    return res
                        .status(statusCode_1.default.UNAUTHORIZED)
                        .json({ message: "Invalid access token" });
                }
            }
            else {
                req.user = user;
                next();
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.verifyToken = verifyToken;
