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
      <nav className="navBar menuCollapsed">
        <div>
          <button type="button" id="hamburgerMenuButton" onClick={this.toggleMenu}>
            <img src="/assets/gridMenu.png" alt="Grid Menu" className="menuIcon menuCollapsed" />
          </button>
        </div>
        <div className="navigationLinksDiv menuCollapsed">
          <Link to="/" className="navLink">
            <img src="/assets/home.png" alt="Home" />
            <div>Home</div>
          </Link>
          <Link to="/createDish" className="navLink">
            <img src="./assets/chef-hat.png" alt="Chef Hat" />
            <div>Create New Dish</div>
          </Link>
          <Link to="/myDishes" className="navLink">
            <img src="./assets/foods-icon.png" alt="Foods" />
            <div>My Dishes</div>
          </Link>
          <Link to="/myDay" className="navLink">
            <img src="./assets/calendar.png" alt="Calendar" />
            <div>My Day</div>
          </Link>
          <Link to="/fitness" className="navLink">
            <img src="./assets/calendar.png" alt="Fitness" />
            <div>Fitness</div>
          </Link>
        </div>
      </nav>
    );
  }
}

export default NavBar;
