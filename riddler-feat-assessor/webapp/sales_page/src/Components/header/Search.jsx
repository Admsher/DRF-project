import React, { useRef, useState, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import PropTypes from "prop-types";

export default function Search({ headerData, scrollToSection }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const searchContainerRef = useRef(null);
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const results = headerData.filter((link) =>
      link.name.toLowerCase().includes(term)
    );
    setSearchResults(results);
  };

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  const toggleCloseSearchInput = () => {
    setShowSearchInput(false);
  };

  const handleClickOutside = (event) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target)
    ) {
      setShowSearchInput(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className='search-container relative' ref={searchContainerRef}>
      <button
        href='#'
        className='search-btn text-cornflowerblue hover:scale-105 transition duration-300'
        onClick={toggleSearchInput}
      >
        <FaMagnifyingGlass />
      </button>
      {showSearchInput && (
        <div className='flex gap-x-1 absolute right-0 top-[50%] -translate-y-[50%]'>
          <input
            type='text'
            value={searchTerm}
            onChange={handleSearch}
            className='search-input py-2 rounded-xl pl-3 pr-10 text-black'
            placeholder='Search...'
          />
          <button
            className='bg-black p-3 rounded-xl'
            type='button'
            onClick={toggleCloseSearchInput}
          >
            X
          </button>
        </div>
      )}
      {showSearchInput && searchTerm && (
        <div className='search-results absolute right-0 bg-white text-black'>
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>
                <button
                  onClick={() => scrollToSection(result.id)}
                  className='block py-2 px-4 hover:font-bold hover:underline'
                >
                  {result.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

Search.propTypes = {
  headerData: PropTypes.array.isRequired,
  scrollToSection: PropTypes.func.isRequired,
};
