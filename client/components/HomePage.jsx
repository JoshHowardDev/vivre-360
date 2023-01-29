/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import '../stylesheets/homePage.css';
import NavBar from './NavBar';
import SearchContainer from './SearchContainer';
import UserDiv from './UserDiv';
import CopyrightDiv from './CopyrightDiv';

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div className="bodyContainer">
        <NavBar />
        <SearchContainer />
        <UserDiv />
        <CopyrightDiv />
      </div>
    );
  }
}

export default HomePage;
