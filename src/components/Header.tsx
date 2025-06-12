import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import countryList from "country-list";
import { publicHolidays } from "../redux/thunk";
import { setCountry } from "../redux/reducer";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const countryFromState = useSelector((state: RootState) => state.country);
  const [countryInput, setCountryInput] = useState("");
  const [yearInput, setYearInput] = useState("");

  useEffect(() => {
    if (countryFromState) {
      setCountryInput(countryFromState);
    }
  }, [countryFromState]);

  const handleCountrySearch = () => {
    const countryName = countryInput.trim();
    if (!countryName) {
      alert("Please enter a country name.");
      return;
    }

    const code = countryList.getCode(countryName);
    if (!code) {
      alert("Invalid country name. Please enter a valid country.");
      return;
    }

    const year = yearInput ? parseInt(yearInput) : new Date().getFullYear();
    if (isNaN(year) || year < 1970 || year > 2100) {
      alert("Please enter a valid year between 1970 and 2100.");
      return;
    }

    dispatch(publicHolidays({ year, code }));
    dispatch(setCountry({ country: countryName, year }));
  };

  const handleYearSearch = () => {
    const year = yearInput ? parseInt(yearInput) : new Date().getFullYear();
    if (isNaN(year) || year < 1970 || year > 2100) {
      alert("Please enter a valid year between 1970 and 2100.");
      return;
    }

    const code =
      countryList.getCode(countryInput.trim()) ||
      countryList.getCode(countryFromState) ||
      "UA";
    if (!code) {
      alert("Country not set. Using default (Ukraine).");
    }

    dispatch(publicHolidays({ year, code }));
    dispatch(
      setCountry({ country: countryInput.trim() || countryFromState, year })
    );
  };

  return (
    <div className="header">
      <h1>Calendar {countryFromState}</h1>
      <div>
        <input
          type="text"
          value={countryInput}
          onChange={(e) => setCountryInput(e.target.value)}
          placeholder="Enter country"
        />
        <button type="button" onClick={handleCountrySearch}>
          Search
        </button>
      </div>
      <div>
        <input
          type="text"
          value={yearInput}
          onChange={(e) => setYearInput(e.target.value)}
          placeholder="Enter year"
        />
        <button type="button" onClick={handleYearSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Header;
