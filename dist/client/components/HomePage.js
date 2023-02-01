import React from 'react';
import '../stylesheets/homePage.css';
import NavBar from './NavBar';
import SearchContainer from './SearchContainer';
import UserDiv from './UserDiv';
import CopyrightDiv from './CopyrightDiv';
function HomePage(_a) {
    var displayName = _a.displayName, picture = _a.picture;
    return (React.createElement(React.Fragment, null,
        React.createElement(NavBar, null),
        React.createElement(SearchContainer, null),
        React.createElement(UserDiv, { displayName: displayName, picture: picture }),
        React.createElement(CopyrightDiv, null)));
}
export default HomePage;
