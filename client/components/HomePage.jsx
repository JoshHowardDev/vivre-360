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
      <>
        <NavBar />
        <SearchContainer />
        <UserDiv />
        <CopyrightDiv />
      </>
    );
  }
}

export default HomePage;
