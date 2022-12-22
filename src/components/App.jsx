import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../stylesheets/meyersReset.css';
import '../stylesheets/app.css';
import HomePage from './HomePage';
import NutrientInfo from './NutrientInfo';
import CreateDish from './createDish/CreateDish';
import MyDishes from './MyDishes';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nutrientInfo" element={<NutrientInfo />} />
          <Route path="/createDish" element={<CreateDish />} />
          <Route path="/myDishes" element={<MyDishes />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
