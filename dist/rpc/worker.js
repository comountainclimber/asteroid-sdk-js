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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var rpc_defaults_1 = require("../constants/rpc-defaults");
var helpers_1 = require("../helpers");
var AsteroidWorkerRpc = (function () {
    function AsteroidWorkerRpc() {
    }
    AsteroidWorkerRpc.claimTask = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'Worker.ClaimTask';
                        return [4, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    AsteroidWorkerRpc.createTask = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'Worker.CreateTask';
                        return [4, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    AsteroidWorkerRpc.getActiveTaskIds = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'Worker.GetActiveTaskIDs';
                        return [4, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    AsteroidWorkerRpc.getTaskById = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'Worker.GetTaskByID';
                        return [4, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    AsteroidWorkerRpc.getUnclaimedTask = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'Worker.GetUnclaimedTask';
                        return [4, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    AsteroidWorkerRpc.resolveTask = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'Worker.ResolveTask';
                        return [4, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    AsteroidWorkerRpc.unclaimTask = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'Worker.UnclaimTask';
                        return [4, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    AsteroidWorkerRpc.registerWorker = function (baseUrl, params, id, methodVersion, config) {
        if (id === void 0) { id = rpc_defaults_1.rpcDefaults.id; }
        if (methodVersion === void 0) { methodVersion = rpc_defaults_1.rpcDefaults.methodVersion; }
        return __awaiter(this, void 0, void 0, function () {
            var method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = 'Worker.RegisterWorker';
                        return [4, base_1.invoke(helpers_1.UrlHelper.getRpcUrl(baseUrl), method, params, id, methodVersion, config)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return AsteroidWorkerRpc;
}());
exports.AsteroidWorkerRpc = AsteroidWorkerRpc;
//# sourceMappingURL=worker.js.map