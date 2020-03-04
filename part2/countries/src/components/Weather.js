import React from 'react';

const Weather = ({ weatherData }) => {

  const {current, location} = weatherData;

  return (
    <>
      <h4>weather in {location.name}</h4>
      <div>
        Temperature: {current.temperature}° <br/>
        Wind: {current.wind_speed} Km/h - Direction: {current.wind_dir}
      </div>
      <img alt={current.weather_descriptions[0]} src={current.weather_icons[0]} />
    </>
  )

};

export default Weather;