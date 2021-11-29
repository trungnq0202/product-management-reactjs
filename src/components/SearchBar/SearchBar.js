import React, { useState } from "react";
import { Search } from "react-bootstrap-icons";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import "./SearchBar.css";

const SearchBar = (props) => {
  const [nameSearch, setNameSearch] = useState("");

  const onNameSearchChange = (e) => {
    setNameSearch(e.target.value);
  };

  const onSearchSubmit = () => {
    props.executeSearch(nameSearch);
  };

  return (
    <Aux>
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            onChange={onNameSearchChange}
            placeholder="Search products by name"
          />
          <button
            type="submit"
            className="searchButton"
            onClick={onSearchSubmit}
          >
            <Search />
          </button>
        </div>
      </div>
    </Aux>
  );
};

export default SearchBar;
