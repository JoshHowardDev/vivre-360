import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/myDishes.css';
import NavBar from './NavBar';

function MyDishes() {
  const [searchResultsDivs, setsearchResultsDivs] = useState([]);
  const [dishesFetched, setDishesFetched] = useState(false);

  useEffect(() => {
    if (dishesFetched) return;
    fetch('/api/getMyDishes')
      .then((res) => res.json())
      .then((dbResponse) => {
        setDishesFetched(true);
        const newSearchResultsDiv = [];
        const maxSearchResults = Math.min(1000, dbResponse.length);
        if (dbResponse.length) {
          for (let i = 0; i < maxSearchResults; i += 1) {
            const newDiv = (
              <div key={`searchResult${i}`} className="searchItem">
                <Link to="/nutrientInfo" state={{ dbTable: dbResponse[i].table, dbId: dbResponse[i].id }}>{dbResponse[i].name}</Link>
              </div>
            );
            newSearchResultsDiv.push(newDiv);
          }
          setsearchResultsDivs(newSearchResultsDiv);
        }
      })
      .catch((err) => console.log('SearchBox.submitSearch ERROR: ', err));
  });

  return (
    <div className="bodyContainer">
      <NavBar />
      <div className="searchContainer">
        <h1>My Dishes</h1>
        <div className="searchResultsDiv">
          {searchResultsDivs}
        </div>
      </div>
    </div>

  );
}

export default MyDishes;
