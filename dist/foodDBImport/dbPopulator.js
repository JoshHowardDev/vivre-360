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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var fs = require('fs').promises;
var path = require('node:path');
var db = require('./dbAPI');
var usdaReference = require('./usdaReference');
// Create function to read and parse a json file
function readAndParse(fileName) {
    return __awaiter(this, void 0, void 0, function () {
        var fileData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs.readFile(path.resolve(__dirname, "./".concat(fileName, ".json")), 'utf8')];
                case 1:
                    fileData = _a.sent();
                    return [2 /*return*/, JSON.parse(fileData)];
            }
        });
    });
}
function transferFoodsToDB(iterations) {
    return __awaiter(this, void 0, void 0, function () {
        var usdaData, foodsArray, usdaStatusObj, lastIdAdded, transferQuantity, _loop_1, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readAndParse('usda/USDALegacyFoods')];
                case 1:
                    usdaData = _a.sent();
                    foodsArray = usdaData.SRLegacyFoods;
                    return [4 /*yield*/, readAndParse('notes/usdaStatus')];
                case 2:
                    usdaStatusObj = _a.sent();
                    lastIdAdded = usdaStatusObj.lastIdAdded;
                    transferQuantity = 100;
                    _loop_1 = function (i) {
                        var newFoodObj = {};
                        // Iterate thru the nutrients on the usda obj, checking if each matches a nutrient in the pg db
                        foodsArray[i].foodNutrients.forEach(function (nutrient) {
                            if (usdaReference.nutrientIdsSet.has(nutrient.nutrient.id.toString())) {
                                var nutrientConnectionDetails = usdaReference.nutrientIds[nutrient.nutrient.id];
                                // For all nutrients that match, add to newFoodObj
                                if (nutrientConnectionDetails.usdaName.trim() === nutrient.nutrient.name.trim()) {
                                    newFoodObj[nutrientConnectionDetails.pgName] = nutrient.amount;
                                }
                            }
                        });
                        // Add food name and fill in null values
                        if (Object.keys(newFoodObj).length) {
                            newFoodObj.name = foodsArray[i].description;
                            usdaReference.nutrientIdsSet.forEach(function (id) {
                                if (!newFoodObj[usdaReference.nutrientIds[id].pgName]) {
                                    newFoodObj[usdaReference.nutrientIds[id].pgName] = null;
                                }
                            });
                            db.addNewFood(newFoodObj);
                        }
                    };
                    for (i = lastIdAdded + 1; i <= lastIdAdded + transferQuantity; i += 1) {
                        _loop_1(i);
                    }
                    usdaStatusObj.lastIdAdded += transferQuantity;
                    return [4 /*yield*/, fs.writeFile(path.resolve(__dirname, './notes/usdaStatus.json'), JSON.stringify(usdaStatusObj))];
                case 3:
                    _a.sent();
                    // Create setTimeout to overcome db error when inserting too many items too fast
                    if (iterations > 1) {
                        setTimeout(function () {
                            transferFoodsToDB(iterations - 1);
                        }, 120000);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
transferFoodsToDB(5);
