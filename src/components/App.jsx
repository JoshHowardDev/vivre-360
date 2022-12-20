import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../stylesheets/meyersReset.css';
import '../stylesheets/app.css';
import HomePage from './HomePage';
import NutrientInfo from './NutrientInfo';
import CreateDish from './CreateDish';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nutrientInfo" element={<NutrientInfo />} />
          <Route path="/createDish" element={<CreateDish />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
