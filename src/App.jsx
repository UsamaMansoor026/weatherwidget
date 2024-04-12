import { useState } from "react";
import "./App.css";
import axios from "axios";

/* Different Weather Icons */
import sunny from "./assets/sun.png";
import rain from "./assets/rain.png";
import snow from "./assets/snow.png";
import mist from "./assets/fog.png";
import cloud from "./assets/cloud.png";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);

  const apiKey = "1c219b910aae98afa49cf05b742d0097";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}&units=metric`;

  const search = () => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        if (
          response.data.weather[0].icon === "01d" ||
          response.data.weather[0].icon === "01n"
        ) {
          setWeatherIcon(sunny);
        } else if (
          response.data.weather[0].icon === "02d" ||
          response.data.weather[0].icon === "02n"
        ) {
          setWeatherIcon(cloud);
        } else if (
          response.data.weather[0].icon === "03d" ||
          response.data.weather[0].icon === "03n"
        ) {
          setWeatherIcon(cloud);
        } else if (
          response.data.weather[0].icon === "04d" ||
          response.data.weather[0].icon === "04n"
        ) {
          setWeatherIcon(cloud);
        } else if (
          response.data.weather[0].icon === "09d" ||
          response.data.weather[0].icon === "09n"
        ) {
          setWeatherIcon(rain);
        } else if (
          response.data.weather[0].icon === "10d" ||
          response.data.weather[0].icon === "10n"
        ) {
          setWeatherIcon(rain);
        } else if (
          response.data.weather[0].icon === "13d" ||
          response.data.weather[0].icon === "13n"
        ) {
          setWeatherIcon(snow);
        } else if (
          response.data.weather[0].icon === "50d" ||
          response.data.weather[0].icon === "50n"
        ) {
          setWeatherIcon(mist);
        } else {
          setWeatherIcon("");
        }
        console.log(response.data);
        setErrorFlag(false);
      })
      .catch((e) => {
        setErrorFlag(true);
      });

    setLocation("");
  };
  return (
    <div className="app">
      <div className="content_container">
        <div className="input_field">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            // onKeyDown={search}
            type="text"
            id="input"
            placeholder="Search for Weather"
            autoComplete="off"
          />
          <span onClick={search}>
            <ion-icon name="search-outline"></ion-icon>
          </span>
        </div>

        {errorFlag ? (
          <p className="errorPara">Error Fetching the Data</p>
        ) : (
          data.name != undefined && (
            <>
              <div className="top">
                <p id="cityName">{data.name}</p>
                <div className="temp_wrapper">
                  {data.main ? (
                    <h1 id="temp">{data.main.temp.toFixed()}&deg;C</h1>
                  ) : null}
                  <img src={weatherIcon} id="weatherType" />
                </div>
                {data.weather ? <p id="type">{data.weather[0].main}</p> : null}
              </div>

              <div className="bottom">
                <div>
                  {data.main ? (
                    <h3 id="feelsLike">
                      {data.main.feels_like.toFixed()}&deg;C
                    </h3>
                  ) : null}

                  <p>Feels Like</p>
                </div>
                <div>
                  {data.main ? (
                    <h3 id="humidity">{data.main.humidity}%</h3>
                  ) : null}
                  <p>Humidity</p>
                </div>
                <div>
                  {data.wind ? (
                    <h3 id="windSpeed">{data.wind.speed.toFixed()}MPH</h3>
                  ) : null}
                  <p>Wind</p>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}

export default App;
