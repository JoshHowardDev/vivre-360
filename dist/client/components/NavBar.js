var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/navBar.css';
import gridMenuIMG from '../../server/static/gridMenu.png';
import homeIconIMG from '../../server/static/home.png';
import chefHatIMG from '../../server/static/chef-hat.png';
import foodsIconIMG from '../../server/static/foods-icon.png';
import calendarIMG from '../../server/static/calendar.png';
var NavBar = /** @class */ (function (_super) {
    __extends(NavBar, _super);
    function NavBar() {
        var _this = _super.call(this) || this;
        _this.state = {
            menuExtended: false,
        };
        _this.toggleMenu = _this.toggleMenu.bind(_this);
        return _this;
    }
    NavBar.prototype.toggleMenu = function () {
        var menuExtended = this.state.menuExtended;
        if (menuExtended) {
            var menuItems = document.querySelectorAll('.menuExtended');
            menuItems.forEach(function (el) {
                el.classList.remove('menuExtended');
            });
        }
        else {
            var menuItems = document.querySelectorAll('.menuCollapsed');
            menuItems.forEach(function (el) {
                el.classList.add('menuExtended');
            });
        }
        var newState = __assign({}, this.state);
        newState.menuExtended = !menuExtended;
        this.setState(newState);
    };
    NavBar.prototype.render = function () {
        return (React.createElement("nav", { className: "navBar menuCollapsed" },
            React.createElement("div", null,
                React.createElement("button", { type: "button", id: "hamburgerMenuButton", onClick: this.toggleMenu },
                    React.createElement("img", { src: gridMenuIMG, alt: "Grid Menu", className: "menuIcon menuCollapsed" }))),
            React.createElement("div", { className: "navigationLinksDiv menuCollapsed" },
                React.createElement(Link, { to: "/", className: "navLink" },
                    React.createElement("img", { src: homeIconIMG, alt: "Home" }),
                    React.createElement("div", null, "Home")),
                React.createElement(Link, { to: "/createDish", className: "navLink" },
                    React.createElement("img", { src: chefHatIMG, alt: "Chef Hat" }),
                    React.createElement("div", null, "Create New Dish")),
                React.createElement(Link, { to: "/myDishes", className: "navLink" },
                    React.createElement("img", { src: foodsIconIMG, alt: "Foods" }),
                    React.createElement("div", null, "My Dishes")),
                React.createElement(Link, { to: "/myDay", className: "navLink" },
                    React.createElement("img", { src: calendarIMG, alt: "Calendar" }),
                    React.createElement("div", null, "My Day")),
                React.createElement(Link, { to: "/fitness", className: "navLink" },
                    React.createElement("img", { src: calendarIMG, alt: "Fitness" }),
                    React.createElement("div", null, "Fitness")))));
    };
    return NavBar;
}(Component));
export default NavBar;
