import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {FiSearch} from "react-icons/fi"

const SearchBar = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault();
    if(!input){
      navigate(`/`)
      return
    }
    navigate(`/?q=${input}`)
};

  return (
    <form className="flex pl-5 border border-gray-300 rounded-full w-full">
  <input
    type="text"
    className="py-2 text-gray-800 border-none w-full rounded-full focus:outline-none"
    placeholder="Search for events..."
    value={input}
    onChange={(e) => {
      setInput(e.target.value);
    }}
  />
  <button
    type="submit"
    className="w-11 h-11 ml-auto flex items-center justify-center  bg-violet-700 text-white rounded-full focus:outline-none"
    onClick={handleClick}
  >
    <FiSearch size={28} />
  </button>
</form>

  );
};

export default SearchBar;
