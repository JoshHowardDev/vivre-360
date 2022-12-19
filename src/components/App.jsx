import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../stylesheets/meyersReset.css';
import '../stylesheets/app.css';
import SearchBox from './SearchBox';
import NutrientInfo from './NutrientInfo';

class App extends Component {
  render() {
    return (
      <div className="bodyContainer">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SearchBox />} />
            <Route path="/nutrientInfo" element={<NutrientInfo />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
