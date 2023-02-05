import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/myDishes.css';
import NavBar from './NavBar';
function MyDishes() {
    var _a = useState([]), searchResultsDivs = _a[0], setsearchResultsDivs = _a[1];
    var _b = useState(false), dishesFetched = _b[0], setDishesFetched = _b[1];
    useEffect(function () {
        if (dishesFetched)
            return;
        fetch('/api/getMyDishes')
            .then(function (res) { return res.json(); })
            .then(function (dbResponse) {
            setDishesFetched(true);
            var newSearchResultsDiv = [];
            var maxSearchResults = Math.min(1000, dbResponse.length);
            if (dbResponse.length) {
                for (var i = 0; i < maxSearchResults; i += 1) {
                    var newDiv = (React.createElement("div", { key: "searchResult".concat(i), className: "searchItem" },
                        React.createElement(Link, { to: "/nutrientInfo", state: { dbTable: dbResponse[i].table, dbId: dbResponse[i].id } }, dbResponse[i].name)));
                    newSearchResultsDiv.push(newDiv);
                }
                setsearchResultsDivs(newSearchResultsDiv);
            }
        })
            .catch(function (err) { return console.log('SearchBox.submitSearch ERROR: ', err); });
    });
    return (React.createElement(React.Fragment, null,
        React.createElement(NavBar, null),
        React.createElement("div", { className: "searchContainer" },
            React.createElement("h1", null, "My Dishes"),
            React.createElement("div", { className: "searchResultsDiv" }, searchResultsDivs))));
}
export default MyDishes;
