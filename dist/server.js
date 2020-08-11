"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
require("./database");
var app = express_1.default();
app.use(express_1.default.json()); // esse vem primeiro para que seja convertido antes de
// chegar nas rotas
app.use(routes_1.default); // esse trecho é como se o index.ts estivesse aqui
app.listen(3333, function () {
    console.log('🚀️ Start Server');
});
