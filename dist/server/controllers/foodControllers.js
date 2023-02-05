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
/* eslint-disable object-curly-newline */
import db from '../db/db';
import nutrientReference from '../../client/data/nutrientReference';
var foodController = {};
foodController.searchFoods = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var searchStr, sanitizedSearchStr, searchTermsArr, ilikeClause, queryString, dbResponse, accumulatedFoods, dishesIlikeClause, dishesQueryString, dishesDbResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                searchStr = req.query.q;
                if (!searchStr.length)
                    return [2 /*return*/, next()];
                sanitizedSearchStr = searchStr.replace(/[.,/#!$%^&*;:{}=\-_`'~()]/g, '');
                // Remove extra spaces
                sanitizedSearchStr = sanitizedSearchStr.replace(/\s{2,}/g, ' ').trim();
                searchTermsArr = sanitizedSearchStr.split(' ');
                ilikeClause = "name ILIKE '%".concat(searchTermsArr.join('%\' AND name ILIKE \'%'), "%'");
                queryString = "SELECT name, _id FROM food WHERE ".concat(ilikeClause, ";");
                return [4 /*yield*/, db.query(queryString)];
            case 1:
                dbResponse = _a.sent();
                accumulatedFoods = [];
                dbResponse.rows.forEach(function (item) {
                    accumulatedFoods.push({
                        table: 'food',
                        id: item._id,
                        name: item.name,
                    });
                });
                dishesIlikeClause = "name ILIKE '%".concat(searchTermsArr.join('%\' AND name ILIKE \'%'), "%'");
                dishesQueryString = "SELECT name, _id FROM dishes WHERE ".concat(dishesIlikeClause, ";");
                return [4 /*yield*/, db.query(dishesQueryString)];
            case 2:
                dishesDbResponse = _a.sent();
                dishesDbResponse.rows.forEach(function (item) {
                    accumulatedFoods.push({
                        table: 'dishes',
                        id: item._id,
                        name: item.name,
                    });
                });
                res.locals.results = accumulatedFoods;
                return [2 /*return*/, next()];
        }
    });
}); };
foodController.getNutrients = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, table, id, queryString, dbResponse;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, table = _a.table, id = _a.id;
                // Filter for IDs greater than 5 digits to prevent injection
                if (!id.length || id.length > 6)
                    return [2 /*return*/, next()];
                queryString = "SELECT * FROM ".concat(table, " WHERE _id = ").concat(id, ";");
                return [4 /*yield*/, db.query(queryString)];
            case 1:
                dbResponse = _b.sent();
                res.locals.results = dbResponse.rows;
                return [2 /*return*/, next()];
        }
    });
}); };
foodController.addDish = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, name, units, ingredientsArr, readQueryString, idString, dbResponse, fullIngredients, newDish, columnsStr, valuesStr, i, insertQueryString, insertDbResponse, addedDish;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, userId = _a.userId, name = _a.name, units = _a.units, ingredientsArr = _a.ingredientsArr;
                readQueryString = 'SELECT * FROM food WHERE _id = ';
                idString = ingredientsArr.map(function (el) { return el.id; }).join(' OR _id = ');
                readQueryString += "".concat(idString, ";");
                return [4 /*yield*/, db.query(readQueryString)];
            case 1:
                dbResponse = _b.sent();
                fullIngredients = dbResponse.rows;
                newDish = { name: name, units: units, userId: userId };
                fullIngredients.forEach(function (ingredient) {
                    Object.keys(ingredient).forEach(function (nutrient) {
                        if (nutrientReference[nutrient].type !== 'info') {
                            newDish[nutrient] = (Number(newDish[nutrient]) || 0) + Number(ingredient[nutrient]);
                        }
                    });
                });
                columnsStr = Object.keys(newDish).join(', ');
                valuesStr = '';
                for (i = 1; i <= Object.keys(newDish).length; i += 1) {
                    valuesStr += ("$".concat(i, ", "));
                }
                valuesStr = valuesStr.slice(0, -2);
                insertQueryString = "INSERT INTO dishes \n  (".concat(columnsStr, ")\n      VALUES (").concat(valuesStr, ")\n      RETURNING _id, name;\n      ");
                return [4 /*yield*/, db.query(insertQueryString, Object.values(newDish))];
            case 2:
                insertDbResponse = _b.sent();
                addedDish = {
                    id: insertDbResponse.rows[0]._id,
                    table: 'dishes',
                    name: insertDbResponse.rows[0].name,
                };
                res.locals.addedDish = addedDish;
                return [2 /*return*/, next()];
        }
    });
}); };
foodController.getServings = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, queryString, dbResponse, servingsObj;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.query.id;
                // Filter for IDs greater than 5 digits to prevent injection
                if (!id.length || id.length > 6)
                    return [2 /*return*/, next()];
                queryString = "SELECT name, gramweight FROM servings WHERE food_id = ".concat(id, ";");
                return [4 /*yield*/, db.query(queryString)];
            case 1:
                dbResponse = _a.sent();
                servingsObj = {};
                dbResponse.rows.forEach(function (serving) {
                    servingsObj[serving.name] = serving.gramweight;
                });
                res.locals.servings = servingsObj;
                return [2 /*return*/, next()];
        }
    });
}); };
foodController.getMyDishes = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var accumulatedFoods, dishesQueryString, dishesDbResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                accumulatedFoods = [];
                dishesQueryString = 'SELECT * FROM dishes;';
                return [4 /*yield*/, db.query(dishesQueryString)];
            case 1:
                dishesDbResponse = _a.sent();
                dishesDbResponse.rows.forEach(function (item) {
                    accumulatedFoods.push({
                        table: 'dishes',
                        id: item._id,
                        name: item.name,
                    });
                });
                res.locals.dishes = accumulatedFoods;
                return [2 /*return*/, next()];
        }
    });
}); };
export default foodController;
