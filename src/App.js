import "./App.css";
import WeatherSearch from "./WeatherSearch";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <WeatherSearch />
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
      </header>
    </div>
  );
}

export default App;
