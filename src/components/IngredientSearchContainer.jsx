/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import '../stylesheets/ingredientSearchContainer.css';

class IngredientSearchContainer extends Component {
  render() {
    const { submitIngredient, searchResults, submitSearch } = this.props;

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
          <div key={`ingredientSearchResult${i}`} className="searchItem">
            <div className="searchResultItem">
              <span>{searchResults[i].name}</span>
              <img src="/assets/extendArrow.png" alt="" data-searchresultindex={i} onClick={toggleExtendedOptions} />
            </div>
            <div className="extendedOptions searchResultCollapsed" data-extendedoptionsindex={i}>
              <form className="ingredientDetailsForm">
                <input type="text" name="ingredientQuantity" id={`ingredientQuantity${i}`} />
                <select name="ingredientUnits" id={`ingredientUnits${i}`}>
                  <option value="g">grams</option>
                </select>
                <img
                  src="/assets/greenCross.png"
                  alt="Add Button"
                  onClick={() => {
                    submitIngredient(searchResults[i]._id, searchResults[i].name, i);
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
      <div className="ingredientSearchContainer">
        <form className="searchForm" onSubmit={submitSearch}>
          <input type="text" name="searchBar" id="searchBar" placeholder="Search to Add..." />
        </form>
        <div className="searchResultsDiv" key={`${searchResults}12`}>
          {searchResultsDivs}
        </div>
      </div>
    );
  }
}

export default IngredientSearchContainer;
