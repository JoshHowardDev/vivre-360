import React from 'react';
import '../stylesheets/userDiv.css';
function userDiv(_a) {
    var displayName = _a.displayName, picture = _a.picture;
    return (React.createElement("div", { className: "userDiv" },
        React.createElement("div", { className: "displayName" }, displayName),
        React.createElement("img", { src: picture, alt: "User", className: "userPhoto" })));
}
export default userDiv;
