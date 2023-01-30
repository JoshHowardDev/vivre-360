import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../stylesheets/meyersReset.css';
import '../stylesheets/app.css';
import HomePage from './HomePage';
import NutrientInfo from './NutrientInfo';
import CreateDish from './createDish/CreateDish';
import MyDishes from './MyDishes';
import MyDay from './myDay/MyDay';
import Fitness from './Fitness';
import Login from '../pages/Login';

function App() {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [displayName, setDisplayName] = useState(null);
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const response = await fetch('/auth/user');
      const parsedResponse = await response.json();
      if (parsedResponse) {
        setDisplayName(parsedResponse.displayName);
        setPicture(parsedResponse.picture);
        setUserAuthenticated(true);
      }
    };
    getUserData();
  }, [userAuthenticated]);

  return (
    <div className="bodyContainer">
      {!userAuthenticated
        ? <Login />
        : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage displayName={displayName} picture={picture} />} />
              <Route path="/nutrientInfo" element={<NutrientInfo />} />
              <Route path="/createDish" element={<CreateDish />} />
              <Route path="/myDishes" element={<MyDishes />} />
              <Route path="/myDay" element={<MyDay />} />
              <Route path="/fitness" element={<Fitness />} />
            </Routes>
          </BrowserRouter>
        )}
    </div>
  );
}

export default App;
