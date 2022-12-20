/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import '../stylesheets/homePage.css';
import NavBar from './NavBar';
import SearchContainer from './SearchContainer';

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
      </div>
    );
  }
}

export default HomePage;
