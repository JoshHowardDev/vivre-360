import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../stylesheets/meyersReset.css';
import '../stylesheets/app.css';
import HomePage from './HomePage';
import NutrientInfo from './NutrientInfo';
import CreateDish from './createDish/CreateDish';
import MyDishes from './MyDishes';
import MyDay from './myDay/MyDay';
import Fitness from '../Fitness';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nutrientInfo" element={<NutrientInfo />} />
          <Route path="/createDish" element={<CreateDish />} />
          <Route path="/myDishes" element={<MyDishes />} />
          <Route path="/myDay" element={<MyDay />} />
          <Route path="/fitness" element={<Fitness />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
