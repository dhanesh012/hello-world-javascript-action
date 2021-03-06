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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
var core = require('@actions/core');
var github = require('@actions/github');
var identity_1 = require("@azure/identity");
var keyvault_secrets_1 = require("@azure/keyvault-secrets");
var vaultName = "dhanesh012";
var url = "https://".concat(vaultName, ".vault.azure.net");
// `who-to-greet` input defined in action metadata file
var nameToGreet = core.getInput('who-to-greet');
console.log("Hello ".concat(nameToGreet, "!"));
var time = (new Date()).toTimeString();
core.setOutput("time", time);
core.exportVariable('DKAV', time + ' some value ');
core.exportVariable('DKAVSecret', 'TopSecret');
core.setSecret('TopSecret');
core.setOutput('dhanOutVar1', 'my output var');
core.setOutput('dhanOutVar2', 'dhan');
core.setSecret("Dhan");
var KeyVaultAuthenticationSP = JSON.parse(core.getInput("creds"));
if (Object.keys(KeyVaultAuthenticationSP).length && KeyVaultAuthenticationSP["tenantId"] && KeyVaultAuthenticationSP["clientId"] && KeyVaultAuthenticationSP["clientSecret"]) {
    core.notice("[authentication] using SP credentials.");
    // && KeyVaultAuthenticationSP["subscriptionId"]
    process.env['AZURE_CLIENT_ID'] = KeyVaultAuthenticationSP["clientId"];
    process.env['AZURE_TENANT_ID'] = KeyVaultAuthenticationSP["tenantId"];
    process.env['AZURE_CLIENT_SECRET'] = KeyVaultAuthenticationSP["clientSecret"];
    // process.env['AZURE_SUBSCRIPTION_ID'] = 'value'
    var clientN = new keyvault_secrets_1.SecretClient(url, new identity_1.DefaultAzureCredential());
}
else {
    core.notice("[authentication] using succeeded az login tokens.");
    var clientN = new keyvault_secrets_1.SecretClient(url, new identity_1.DefaultAzureCredential());
}
//   async function fetchSecrets() {
// for await (const item of clientN.listPropertiesOfSecrets()) {
//     console.log(item.name)
//     core.info("Fetching secret - ${item.name}")
// }
//   }
// Get the JSON webhook payload for the event that triggered the workflow
fetchSecrets();
var payload = JSON.stringify(github.context.payload, undefined, 2);
console.log("The event payload : ".concat(payload));
function fetchSecrets() {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var _b, _c, item, e_1_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 5, 6, 11]);
                    _b = __asyncValues(clientN.listPropertiesOfSecrets());
                    _d.label = 1;
                case 1: return [4 /*yield*/, _b.next()];
                case 2:
                    if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 4];
                    item = _c.value;
                    console.log(item.name);
                    core.info("Fetching secret - ${item.name}");
                    _d.label = 3;
                case 3: return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 11];
                case 5:
                    e_1_1 = _d.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 11];
                case 6:
                    _d.trys.push([6, , 9, 10]);
                    if (!(_c && !_c.done && (_a = _b["return"]))) return [3 /*break*/, 8];
                    return [4 /*yield*/, _a.call(_b)];
                case 7:
                    _d.sent();
                    _d.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 10: return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    });
}
