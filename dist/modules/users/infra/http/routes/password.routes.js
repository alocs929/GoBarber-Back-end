"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ForgotPasswordControlles_1 = __importDefault(require("../controllers/ForgotPasswordControlles"));
var ResetPasswordController_1 = __importDefault(require("../controllers/ResetPasswordController"));
var passwordRouter = express_1.Router();
var forgotPasswordControlle = new ForgotPasswordControlles_1.default();
var resetPasswordControlle = new ResetPasswordController_1.default();
passwordRouter.post('/forgot', forgotPasswordControlle.create);
passwordRouter.post('/reset', resetPasswordControlle.create);
exports.default = passwordRouter;
