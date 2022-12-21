/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/navBar.css';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      menuExtended: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    const { menuExtended } = this.state;
    if (menuExtended) {
      const menuItems = document.querySelectorAll('.menuExtended');
      menuItems.forEach((el) => {
        el.classList.remove('menuExtended');
      });
    } else {
      const menuItems = document.querySelectorAll('.menuCollapsed');
      menuItems.forEach((el) => {
        el.classList.add('menuExtended');
      });
    }
    const newState = { ...this.state };
    newState.menuExtended = !menuExtended;
    this.setState(newState);
  }

  render() {
    return (
      <nav className="navBar">
        <div>
          <button type="button" id="hamburgerMenuButton" onClick={this.toggleMenu}>
            <img src="/assets/gridMenu.png" alt="Grid Menu" className="menuIcon" />
          </button>
        </div>
        <Link to="/createDish">
          <div className="menuCollapsed">Create New Dish</div>
        </Link>
        <Link to="/myDishes">
          <div className="menuCollapsed">My Dishes</div>
        </Link>
      </nav>
    );
  }
}

export default NavBar;
