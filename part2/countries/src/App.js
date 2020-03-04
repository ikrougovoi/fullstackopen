import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Results from './components/Results';

function App() {
  
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  const [showMessage, setShowMessage] = useState(true);

  // get list of countries and set state
  const hook = () => {
		axios
			.get('https://restcountries.eu/rest/v2/all')
			.then(response => {
				setCountries(response.data);
			});
	};
  useEffect(hook, []);

  const countriesToShow = showMessage ? 0 : countries.filter(country => {
    return country.name.toLowerCase().includes(search.toLowerCase()); 
  });
  
  const handleCountrySearch = (event) => {
    setSearch(event.target.value);
    setShowMessage(false);
  };

  const handleButtonClick = (event) => {
    setSearch(event.target.parentElement.firstChild.data);
  };

  return (
    <div>
      find countries: <Filter filterHandler={handleCountrySearch} />
      <h2>Results</h2>
      <Results countriesList={countriesToShow} handleButtonClick={handleButtonClick} />
    </div>
  );
}

export default App;
