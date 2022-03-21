import React, { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");

  const api = {
    key: "590bf9e61d8f5486ca59d70e6e731e79",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&&units=metric&&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };
  const unixConverter = () => {
    const unixTimestamp = 1575909015;
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
    const humanDateFormat = dateObject.toLocaleString();

    let utc = humanDateFormat(weather.sys.sunrise);
    return `${utc}`;
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 12
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {typeof weather.main != "undefined" ? (
          <div className="overflow-hidden">
            <div className="location-box">
              <div className="location">{weather.name}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)} °C</div>
            </div>
            <div className="weather-info">
              <div className="min-max">
                <div className="max h4">
                  Max: {Math.round(weather.main.temp_max)} ° &nbsp;
                </div>
                <div className="min h4">
                  Min: {Math.round(weather.main.temp_min)} °
                </div>
              </div>
            </div>
            <div className="cards">
              <div className="container">
                <div className="">
                  <div className="d-flex justify-content-around">
                    <div className="box w-50 p-3 m-3 d-block align-items-center">
                      <div className="box-title">
                        Humidity:{" "}
                        <div className="box-info h1">
                          {weather.main.humidity} %
                        </div>{" "}
                      </div>
                      <div className="box-title">
                        Feels like:{" "}
                        <div className="box-info h1">
                          {weather.main.feels_like} °C
                        </div>
                      </div>
                    </div>
                    <div className="box w-50 p-3 m-3 d-block align-items-center">
                      <div className="box-title">
                        Wind:{" "}
                        <div className="box-info h1">
                          {weather.wind.speed} km/h
                        </div>{" "}
                      </div>
                      <div className="box-title">
                        Degrees:{" "}
                        <div className="box-info h1">{weather.wind.deg} °</div>
                      </div>
                    </div>
                    <div className="box w-50 p-3 m-3 d-block align-items-center">
                      <div className="box-title">
                        Longitude:{" "}
                        <div className="box-info h1">
                          {weather.coord.lon.toFixed(2)}
                        </div>{" "}
                      </div>
                      <div className="box-title">
                        Latitude:{" "}
                        <div className="box-info h1">
                          {weather.coord.lat.toFixed(2)}
                        </div>{" "}
                      </div>
                    </div>
                    <div className="box w-50 p-3 m-3 d-block align-items-center">
                      <div className="box-title">
                        Sunrise:{" "}
                        <div className="box-info h1">{weather.sys.sunrise}</div>{" "}
                      </div>
                      <div className="box-title">
                        Sunset:{" "}
                        <div className="box-info h1">{weather.sys.sunset}</div>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          "Weather App using React"
        )}
      </main>
    </div>
  );
}

export default App;
