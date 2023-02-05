import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/navBar.css';
import gridMenuIMG from '../images/gridMenu.png';
import homeIconIMG from '../images/home.png';
import chefHatIMG from '../images/chef-hat.png';
import foodsIconIMG from '../images/foods-icon.png';
import calendarIMG from '../images/calendar.png';

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
            <img src={gridMenuIMG} alt="Grid Menu" className="menuIcon menuCollapsed" />
          </button>
        </div>
        <div className="navigationLinksDiv menuCollapsed">
          <Link to="/" className="navLink">
            <img src={homeIconIMG} alt="Home" />
            <div>Home</div>
          </Link>
          <Link to="/createDish" className="navLink">
            <img src={chefHatIMG} alt="Chef Hat" />
            <div>Create New Dish</div>
          </Link>
          <Link to="/myDishes" className="navLink">
            <img src={foodsIconIMG} alt="Foods" />
            <div>My Dishes</div>
          </Link>
          <Link to="/myDay" className="navLink">
            <img src={calendarIMG} alt="Calendar" />
            <div>My Day</div>
          </Link>
          <Link to="/fitness" className="navLink">
            <img src={calendarIMG} alt="Fitness" />
            <div>Fitness</div>
          </Link>
        </div>
      </nav>
    );
  }
}

export default NavBar;
