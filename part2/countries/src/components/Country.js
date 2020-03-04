import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './Weather';

const Country = ({ country }) => {

  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERSTACK_API}&query=${country.capital}&units=m`)
      .then(response => {
        console.log(response.data);
        setWeather(response.data);
        setLoading(false);
      })
  }, [country.capital]);

  if (loading) {
    return (
      <div>
        retrieving data ...
      </div>
    )
  };

  return (
    <div key={country.name}>
      <h3>{country.name}</h3>
      capital: {country.capital} <br/>
      population: {country.population} <br/>

      <h4>Spoken languages</h4>

      <ul>
        {country.languages.map(lang => 
          <li key={lang.name}>
            {lang.name}
          </li>
        )}
      </ul>

      <img alt={country.name} src={country.flag} width='150' />

      <Weather weatherData={weather} />

    </div>
  )
};

export default Country;