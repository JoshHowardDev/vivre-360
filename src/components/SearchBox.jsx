/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/searchBox.css';

class SearchBox extends Component {
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
      <div>
        <form className="searchForm" onSubmit={this.submitSearch}>
          <input type="text" name="searchBar" id="searchBar" placeholder="Search..." />
        </form>
        <div className="searchResultsDiv">{searchResultsDivs}</div>
      </div>
    );
  }
}

export default SearchBox;
