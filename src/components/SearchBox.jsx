import React, { Component } from 'react';

class SearchBox extends Component {
  render() {
    return (
      <div>
        <form className="searchForm">
          <input type="text" name="searchBar" id="searchBar" placeholder="Search..." />
        </form>
      </div>
    );
  }
}

export default SearchBox;
