/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/searchContainer.css';
// import { TransitionGroup } from 'react-transition-group';

class SearchContainer extends Component {
  constructor() {
    super();
    this.state = {
      searchResults: [],
    };
    this.submitSearch = this.submitSearch.bind(this);
  }

  submitSearch(e) {
    e.preventDefault();
    const searchStr = e.target.elements.searchBar.value;
    fetch(`/api/searchFoods?q=${searchStr}`)
      .then((res) => res.json())
      .then((dbResponse) => {
        const newState = { ...this.state };
        newState.searchResults = dbResponse;
        this.setState(newState);
      })
      .catch((err) => console.log('SearchBox.submitSearch ERROR: ', err));
  }

  render() {
    const { searchResults } = this.state;
    const searchResultsDivs = [];
    const maxSearchResults = Math.min(1000, searchResults.length);
    if (searchResults.length) {
      for (let i = 0; i < maxSearchResults; i += 1) {
        const newDiv = (
          <div key={`searchResult${i}`} className="searchItem">
            <Link to="/nutrientInfo" state={{ foodId: searchResults[i]._id }}>{searchResults[i].name}</Link>
          </div>
        );
        searchResultsDivs.push(newDiv);
      }
    }

    return (
      <div className="searchContainer">
        <form className="searchForm" onSubmit={this.submitSearch}>
          <input type="text" name="searchBar" id="searchBar" placeholder="Search..." />
        </form>
        <div className="searchResultsDiv">
          {/* <TransitionGroup transitionName="searchResultTransition"
          transitionEnterTimeout={300} transitionLeaveTimeout={0}> */}
          {searchResultsDivs}
          {/* </TransitionGroup> */}
        </div>
      </div>
    );
  }
}

export default SearchContainer;
