import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
const SearchBar = () => {
  const router = useRouter();

  const clickPoint = useRef();

  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  const handleClick = () => {
    if (search === null || search === '') {
      setError('required');
      console.log('required');
    } else {
      router.push({ pathname: '/medicine', query: { q: search } });
    }
  };

  const handleFocus = () => {
    clickPoint.current.style.display = 'none';
  };

  const handleBlur = () => {
    clickPoint.current.style.display = 'block';
  };

  const onChangeHandler = (value) => {
    // console.log(value);
    setSearch(value);
    if (value.length > 2) {
      axios
        .get(
          `https://medlr-backend.cyclic.app/api/elasticsearch/search-suggestion?q=${value}`
        )
        .then((res) => {
          // console.log(res.data);
          setSuggestions(res.data);
          // console.log(suggestions)
          // setMedicine(value)
          // setMedicinesResult(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center gap-x-4 w-[40%]">
        <div className="flex flex-col items-center w-[15%]">
          <svg
            width="25"
            height="25"
            viewBox="0 0 58 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M53.1667 21.375V35.625C53.1667 41.5625 51.9583 45.7187 49.2517 48.4025L33.8333 33.25L52.5142 14.8912C52.9492 16.7675 53.1667 18.905 53.1667 21.375Z"
              stroke="#EAEAEA"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M52.5142 14.8912L15.1525 51.6087C7.87833 49.97 4.83333 45.03 4.83333 35.625V21.375C4.83333 9.5 9.66666 4.75 21.75 4.75H36.25C45.82 4.75 50.8467 7.7425 52.5142 14.8912Z"
              stroke="#EAEAEA"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M49.2517 48.4025C46.5208 51.0625 42.2917 52.25 36.25 52.25H21.75C19.2367 52.25 17.0617 52.0362 15.1525 51.6087L33.8333 33.25L49.2517 48.4025Z"
              stroke="#EAEAEA"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.08 18.9525C16.7233 11.9938 27.3567 11.9938 29 18.9525C29.9425 23.0375 27.3325 26.505 25.0367 28.6425C24.2282 29.3977 23.1554 29.8187 22.04 29.8187C20.9246 29.8187 19.8518 29.3977 19.0433 28.6425C16.7475 26.505 14.1133 23.0375 15.08 18.9525Z"
              stroke="#EAEAEA"
              stroke-width="4"
            />
            <path
              d="M21.9796 20.6625H22.0007"
              stroke="#EAEAEA"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <textarea
           type="number"
           className="text-white text-xs bg-transparent text-center border-transparent border-b-white border-2 resize-none"
           rows={1}
           cols={7}
           placeholder="Pincode"
          />
        </div>
        <input
          type="search"
          className="block w-full px-4 py-2 text-black bg-white border rounded-xl focus:border-slate-400 focus:ring-slate-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Search..."
          name="search"
          value={search}
          onChange={(e) => onChangeHandler(e.target.value)}
        />
        <button
          onClick={handleClick}
          className="px-4 h-full text-white text-lg bg-[#F1CD4B] hover:text-[#00BFBE] rounded-xl "
        >
          Search
        </button>
      </div>
      <div className="w-96 text-white text-l bg-transparent text-left relative">
        <ul className="">
          {suggestions &&
            suggestions.length > 0 &&
            suggestions.map((suggestion, index) => {
              {
                /* console.log(suggestion.fields.Salts[0]); */
              }
              {
                /* console.log(suggestions) */
              }
              return (
                <li
                  key={index}
                  onClick={() => {
                    setSearch(suggestion);
                    setSuggestions([]);
                  }}
                >
                  {suggestion}
                  {/* {suggestion.fields.Medicine_Name[0]} (
                  {suggestion.fields.Salts[0]}) */}
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default SearchBar;
