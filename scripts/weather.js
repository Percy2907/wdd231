// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// your personal OpenWeatherMap API key
const apiKey = '5eadf6652026a117acc0568c2c49850a';
const url = `https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=${apiKey}`;

// fetch data asynchronously
async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // check what the API returns
      displayResults(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

// run the function
apiFetch();

// display the results on the HTML page
function displayResults(data) {
  // show temperature
  currentTemp.innerHTML = `${data.main.temp.toFixed(1)}&deg;C`;

  // build icon URL
  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const desc = data.weather[0].description;

  // set attributes for the image and caption
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc;
}