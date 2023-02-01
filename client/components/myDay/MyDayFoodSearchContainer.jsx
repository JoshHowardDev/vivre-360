/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import '../../stylesheets/myDay/myDayFoodSearchContainer.css';
import extednArrowIMG from '../../../server/static/extendArrow.png';

class MyDayFoodSearchContainer extends Component {
  render() {
    const { submitFood, searchResults, submitSearch } = this.props;

    function toggleExtendedOptions(e) {
      const searchResultIndex = e.target.getAttribute('data-searchresultindex');
      const extendedDiv = document.querySelector(`[data-extendedoptionsindex="${searchResultIndex}"]`);
      extendedDiv.classList.toggle('searchResultCollapsed');
    }

    const searchResultsDivs = [];
    const maxSearchResults = Math.min(1000, searchResults.length);
    if (searchResults.length) {
      for (let i = 0; i < maxSearchResults; i += 1) {
        const newDiv = (
          <div key={`foodSearchResult${i}`} className="searchItem">
            <div className="searchResultItem">
              <span>{searchResults[i].name}</span>
              <img src={extednArrowIMG} alt="" data-searchresultindex={i} onClick={toggleExtendedOptions} />
            </div>
            <div className="extendedOptions searchResultCollapsed" data-extendedoptionsindex={i}>
              <form className="foodDetailsForm">
                <input type="text" name="foodQuantity" id={`foodQuantity${i}`} />
                <select name="foodUnits" id={`foodUnits${i}`}>
                  <option value="g">grams</option>
                </select>
                <img
                  src="/assets/greenCross.png"
                  alt="Add Button"
                  onClick={() => {
                    submitFood(searchResults[i].id, searchResults[i].table, searchResults[i].name, i);
                  }}
                />
              </form>
            </div>
          </div>
        );
        searchResultsDivs.push(newDiv);
      }
    }

    return (
      <div className="foodSearchContainer">
        <form className="searchForm" onSubmit={submitSearch}>
          <input type="text" name="searchBar" id="searchBar" placeholder="Search to Add..." />
        </form>
        <div className="searchResultsContainer" key={`${searchResults}12`}>
          {searchResultsDivs}
        </div>
      </div>
    );
  }
}

export default MyDayFoodSearchContainer;
