import React from 'react';
import NavBar from './NavBar';
function Fitness() {
    return (React.createElement(React.Fragment, null,
        React.createElement(NavBar, null),
        React.createElement("div", { className: "fitnessContainer" },
            React.createElement("div", { className: "caloriesContainer" }, "Something"))));
}
export default Fitness;
