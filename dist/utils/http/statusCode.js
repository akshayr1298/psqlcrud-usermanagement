"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = __importStar(require("http-status-codes"));
const statusCodes = {
    CREATED: HttpStatus.CREATED, // 201
    SUCCESS: HttpStatus.OK, // 200
    ACCEPTED: HttpStatus.ACCEPTED, // 202
    BAD_REQUEST: HttpStatus.BAD_REQUEST, // 400
    UNAUTHORIZED: HttpStatus.UNAUTHORIZED, // 401
    SERVER_ERROR: HttpStatus.INTERNAL_SERVER_ERROR, // 500
    FORBIDDEN: HttpStatus.FORBIDDEN, // 403
    NOT_FOUND: HttpStatus.NOT_FOUND, // 404
    CONFLICT: HttpStatus.CONFLICT, // 409
    NOT_IMPLEMENTED: HttpStatus.NOT_IMPLEMENTED, // 501
    SERVICE_UNAVAILABLE: HttpStatus.SERVICE_UNAVAILABLE // 503
};
exports.default = statusCodes;
