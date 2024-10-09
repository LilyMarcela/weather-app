const express = require("express");
const axios = require("axios");
const app = express();

const API_KEY = "";

app.get("/", (req, res) => res.json({ message: "Welcome to the weather api" }));
app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return rest.status(400).json({ error: "City name is required" });
  }

  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  try {
    const response = await axios.get(url);
    const weatherData = response.data;
    res.json({
      city: weatherData.name,
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
      humidity: weatherData.main.humidity,
      wind_speed: weatherData.wind.speed,
    });
  } catch (error) {
    res.status(404).json({ error: "City not found" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
