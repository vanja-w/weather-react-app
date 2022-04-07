import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ReactAnimatedWeather from "react-animated-weather";
import moment from "moment";

export default function WeatherSearch() {
  let [city, setCity] = useState(null);
  let [loaded, setLoaded] = useState(false);
  let [weatherInfo, setWeatherInfo] = useState({});
  let [weatherIcon, setWeatherIcon] = useState({});

  let weatherIcons = {
    Thunderstorm: `CLOUDY`,
    Drizzle: `RAIN`,
    Rain: `SLEET`,
    Snow: `SNOW`,
    Atmosphere: `FOG`,
    Clear: `CLEAR_DAY`,
    Clouds: `CLOUDY`,
  };

  let currentDate = new Date();
  currentDate = moment(currentDate.getTime()).format(
    "dddd, MMMM Do YYYY | HH:mm "
  );

  function getWeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        setWeatherIcon({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        setWeatherIcon({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 531:
        setWeatherIcon({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        setWeatherIcon({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        setWeatherIcon({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        setWeatherIcon({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        setWeatherIcon({ icon: icons.Clouds });
        break;
      default:
        setWeatherIcon({ icon: icons.Clouds });
    }
  }

  function getWeatherInfo(response) {
    console.log(response);
    setLoaded(true);
    setWeatherInfo({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
    });
    getWeatherIcon(weatherIcons, response.data.weather[0].id);
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
    <Container>
      <Row>
        <Col>
          <form onSubmit={handleSubmit}>
            <input
              type="search"
              placeholder="Enter city"
              onChange={updateCity}
            />
            <input type="submit" value="Search" />
          </form>
        </Col>
      </Row>
    </Container>
  );

  if (loaded) {
    return (
      <div className="WeatherSearch">
        {form}
        <Container>
          <Row className="mt-5">
            <Col className="city-col">
              <h3 className="current-city text-end">{city}</h3>
            </Col>
            <Col className="current-temp">
              {Math.round(weatherInfo.temperature)}°C
            </Col>
            <Col className="description-col">
              <ReactAnimatedWeather
                icon={weatherIcon.icon}
                color="black"
                size={40}
                animate={true}
              />
              <p>{weatherInfo.description}</p>
            </Col>
          </Row>

          <Row>
            <Col>
              <p>{currentDate}</p>
            </Col>
            <Col>Wind: {Math.round(weatherInfo.wind)}km/h</Col>
            <Col>Humidity: {weatherInfo.humidity}%</Col>
          </Row>

          <Row>
            <Col>
              <p>Tue</p>
              <ReactAnimatedWeather
                icon="RAIN"
                color="black"
                size={40}
                animate={true}
              />
            </Col>
            <Col>
              <p>Wed</p>

              <ReactAnimatedWeather
                icon="SNOW"
                color="black"
                size={40}
                animate={true}
              />
            </Col>
            <Col>
              <p>Thu</p>

              <ReactAnimatedWeather
                icon="CLOUDY"
                color="black"
                size={40}
                animate={true}
              />
            </Col>
            <Col>
              <p>Fri</p>

              <ReactAnimatedWeather
                icon="CLEAR_DAY"
                color="black"
                size={40}
                animate={true}
              />
            </Col>
            <Col>
              <p>Sat</p>

              <ReactAnimatedWeather
                icon="WIND"
                color="black"
                size={40}
                animate={true}
              />
            </Col>
          </Row>
        </Container>
        <small>
          <a
            href="https://github.com/vanja-w/weather-react-app"
            target="_blank"
            rel="noreferrer"
          >
            Open-source code
          </a>
          , by Vanja Wallace
        </small>
      </div>
    );
  } else {
    return form;
  }
}
