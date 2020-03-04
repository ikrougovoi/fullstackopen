import React from 'react';
import Country from './Country';

const Results = ({ countriesList, handleButtonClick }) => {
  if (countriesList === 0) {
    return (
      <>
        Please search for a country.
      </>
    )
  } else {
    if (countriesList.length > 10) {
      return (
        <>
          Too many matches, please be more specific.
        </>
      )
    } else {
      if (countriesList.length === 1) {
        return (
          countriesList.map(country =>
            <Country key={country.name} country={country} />
          )
        )
      } else {
        return (
          <>
            <ul>
              {countriesList.map(country => 
                <div key={country.name}>
                  <li>
                    {country.name}
                    <button onClick={handleButtonClick}>
                      Show
                    </button>
                  </li>
                </div>  
              )}
            </ul>
          </>
        )
      }
    }
  }
};

export default Results;