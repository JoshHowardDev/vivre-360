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
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../stylesheets/meyersReset.css';
import '../stylesheets/app.css';
import HomePage from './HomePage';
import NutrientInfo from './NutrientInfo';
import CreateDish from './createDish/CreateDish';
import MyDishes from './MyDishes';
import MyDay from './myDay/MyDay';
import Fitness from './Fitness';
import Login from '../pages/Login';
function App() {
    var _this = this;
    var _a = useState(false), userAuthenticated = _a[0], setUserAuthenticated = _a[1];
    var _b = useState(null), displayName = _b[0], setDisplayName = _b[1];
    var _c = useState(null), picture = _c[0], setPicture = _c[1];
    useEffect(function () {
        var getUserData = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, parsedResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/auth/user')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        parsedResponse = _a.sent();
                        if (parsedResponse) {
                            setDisplayName(parsedResponse.displayName);
                            setPicture(parsedResponse.picture);
                            setUserAuthenticated(true);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        getUserData();
    }, [userAuthenticated]);
    return (React.createElement("div", { className: "bodyContainer" }, !userAuthenticated
        ? React.createElement(Login, null)
        : (React.createElement(BrowserRouter, null,
            React.createElement(Routes, null,
                React.createElement(Route, { path: "/", element: React.createElement(HomePage, { displayName: displayName, picture: picture }) }),
                React.createElement(Route, { path: "/nutrientInfo", element: React.createElement(NutrientInfo, null) }),
                React.createElement(Route, { path: "/createDish", element: React.createElement(CreateDish, null) }),
                React.createElement(Route, { path: "/myDishes", element: React.createElement(MyDishes, null) }),
                React.createElement(Route, { path: "/myDay", element: React.createElement(MyDay, null) }),
                React.createElement(Route, { path: "/fitness", element: React.createElement(Fitness, null) }))))));
}
export default App;