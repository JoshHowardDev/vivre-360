import React, { Component } from 'react';

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
    const maxSearchResults = Math.min(20, searchResults.length);
    if (searchResults.length) {
      for (let i = 0; i < maxSearchResults; i += 1) {
        searchResultsDivs.push(<div key={`searchResult${i}`} className="searchItem">{searchResults[i].name}</div>);
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
