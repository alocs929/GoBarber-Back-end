"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var auth_1 = __importDefault(require("@config/auth"));
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
function ensureAuthenticated(request, response, next) {
    var authHeadet = request.headers.authorization;
    if (!authHeadet) {
        throw new AppError_1.default('JWT token missing', 401);
    }
    var secret = auth_1.default.jwt.secret;
    var _a = authHeadet.split(' '), token = _a[1];
    try {
        var decoded = jsonwebtoken_1.verify(token, secret); // aqui retorna um tipo que na exist
        // cria o tipo com uma interface
        // e força ele a ser daquele tipo
        var sub = decoded.sub;
        // pra isso funciona tive que sobrescrever o type Request
        request.user = {
            id: sub,
        };
    }
    catch (_b) {
        throw new AppError_1.default('Invalid JWT token', 401);
    }
    return next();
}
exports.default = ensureAuthenticated;
