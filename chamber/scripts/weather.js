const apiKey = "5eadf6652026a117acc0568c2c49850a";
const city = "Lima";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

/* ---------------------------
      CURRENT WEATHER
---------------------------- */
async function getWeather() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const temp = data.main.temp.toFixed(1);
    const desc = data.weather[0].description;
    const high = data.main.temp_max.toFixed(1);
    const low = data.main.temp_min.toFixed(1);
    const humidity = data.main.humidity;

    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const sunrise = new Date(data.sys.sunrise * 1000)
      .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const sunset = new Date(data.sys.sunset * 1000)
      .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    document.getElementById("weather").innerHTML = `
      <div class="weather-container">
        <img src="${iconUrl}" alt="${desc}" class="weather-icon">

        <div class="weather-details">
          <p class="temp-main">Temp: ${temp}°C</p>
          <p>${desc}</p>
          <p>High: ${high}°C</p>
          <p>Low: ${low}°C</p>
          <p>Humidity: ${humidity}%</p>
          <p>Sunrise: ${sunrise}</p>
          <p>Sunset: ${sunset}</p>
        </div>
      </div>
    `;
  } catch (error) {
    console.log("Weather error:", error);
  }
}

/* ---------------------------
      3–DAY FORECAST
---------------------------- */
async function getForecast() {
  try {
    const response = await fetch(forecastUrl);
    const data = await response.json();

    const threeDays = data.list
      .filter(item => item.dt_txt.includes("12:00:00"))
      .slice(0, 3);

    const dayNames = [
      "Sunday", "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday"
    ];

    const todayIndex = new Date().getDay();

    const labels = [
      "Today:",
      dayNames[(todayIndex + 1) % 7] + ":",
      dayNames[(todayIndex + 2) % 7] + ":"
    ];

    let html = "";

    threeDays.forEach((day, index) => {
      html += `
        <div class="forecast-day">
        <p><strong>${labels[index]}</strong> <span class="forecast-temp">${day.main.temp.toFixed(1)}°C</span></p>
        </div>
      `;
    });

    document.getElementById("forecast").innerHTML = html;

  } catch (error) {
    console.log("Forecast error:", error);
  }
}

/* ---------------------------
      INIT
---------------------------- */
getWeather();
getForecast();