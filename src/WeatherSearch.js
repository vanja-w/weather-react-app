import React, { useState } from "react";
import "./App.css";
import axios from "axios";

export default function WeatherSearch() {
  let [city, setCity] = useState(null);
  let [loaded, setLoaded] = useState(false);

  function getWeatherInfo(response) {
    setLoaded(true);
    console.log(response.data);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "c904083ce9d848d6eee6931b635cd191";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(getWeatherInfo);
    console.log("submit handled");
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Enter city" onChange={updateCity} />
      <input type="submit" value="Search" />
    </form>
  );

  if (loaded) {
    return (
      <div className="WeatherSearch">
        <p>Tuesday, 29 March 2022 | 22:20</p>
        <h3>{city}</h3>
      </div>
    );
  } else {
    return form;
  }
}
