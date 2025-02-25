
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [city, setCity] = useState("Kolkata");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async () => {
    if (!city) return;
    const apiKey = "d6de07cd6078600f8a9b3786cf3cb81a"; 
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      setWeatherData({
        name: response.data.name,
        country: response.data.sys.country,
        temp: response.data.main.temp,
        humidity: response.data.main.humidity,
        condition: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
      });
    } catch (err) {
      setWeatherData(null);
      setError(err.response?.data?.message || "Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen w-full p-6 transition-all ${
        weatherData?.temp > 20
          ? "bg-gradient-to-br from-orange-500 to-yellow-500"
          : "bg-gradient-to-br from-blue-600 to-indigo-800"
      }`}
    >
      <div className="w-full max-w-md md:max-w-lg bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl shadow-xl p-8 text-white text-center">
        <h1 className="text-black text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-lg">
          🌤 Weather App
        </h1>

        {/* Search Bar */}
        <div className="flex items-center bg-white bg-opacity-40 rounded-full px-4 py-2 shadow-md w-full">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-900 px-2 py-1 placeholder-gray-700 text-lg"
          />
          <button
            onClick={fetchWeatherData}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300"
          >
            🔍
          </button>
        </div>

        {/* Error Handling */}
        {error && (
          <div className="mt-4 text-red-500 font-semibold text-lg">{error}</div>
        )}

        {/* Loading State */}
        {loading && (
          <p className="text-white text-lg mt-6 animate-pulse">
            Fetching weather data...
          </p>
        )}

        {/* Weather Data */}
        {weatherData && (
          <div className="mt-8 p-8 bg-white bg-opacity-30 backdrop-blur-md shadow-xl rounded-2xl transform hover:scale-105 transition duration-500">
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
              alt="Weather Icon"
              className="mx-auto w-24 h-24 drop-shadow-lg"
            />
            <h2 className="text-black text-4xl font-bold">
              {weatherData.name}, {weatherData.country}
            </h2>
            <p className="text-black text-5xl mt-3 capitalize"> Condition: {weatherData.condition}</p>
            <p className="text-black text-4xl font-extrabold mt-3">
              Temperature: {weatherData.temp}°C
            </p>
            <p className="text-black text-4xl mt-3 capitalize">
              Humidity: {weatherData.humidity}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;