//date formatting
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  
  let date = new Date();
  
  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let currentHours = date.getHours();
  let currentMinutes = date.getMinutes();
  let currentTime = "AM";
  
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  if (currentHours > 12) {
    currentHours = currentHours - 12;
    currentTime = "PM";
  }
  
  let theDate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear} <br> ${currentHours}:${currentMinutes} ${currentTime}`;
  
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${theDate}`;
  
  //global temp
  let fahrenheitLink = document.querySelector("#fahrenheit");
  let celsiusLink = document.querySelector("#celsius");

  let celsiusTemperature = null;
  let fahrenheitTemperature = null;
  let feelsLikeTemperature = null;

  //Search Temp
  function getTemp(response) {
    let selectedCity = document.querySelector("#city-input");
    let searchInput = response.data.name;
    selectedCity.innerHTML = searchInput;
    //main temperature change
    let currentTemp = Math.round(response.data.main.temp);
    let newDegreeTemp = document.querySelector("#degrees");
    newDegreeTemp.innerHTML = `${currentTemp}`;

    celsiusTemperature = response.data.main.temp;
    fahrenheitTemperature = response.data.main.temp;
    feelsLikeTemperature = response.data.main.feels_like;

    //feels like
    let feelsLike = document.querySelector("#feels-like");
    feelsLike.innerHTML = Math.round(response.data.main.feels_like);

    //wind
    let windSpeed = document.querySelector("#wind");
    windSpeed.innerHTML = Math.round(response.data.wind.speed);

    //sky description
    let description = document.querySelector("#description");
    description.innerHTML = response.data.weather[0].description;
    let weatherIcon = document.querySelector("#icon");
    
    if (response.data.weather[0].description.includes("clouds") === true) {
      weatherIcon.innerHTML = "⛅️";
    } else if (response.data.weather[0].description.includes("rain") === true) {
        weatherIcon.innerHTML ="🌧";
      } else if (response.data.weather[0].description.includes("thunderstorm") === true) {
        weatherIcon.innerHTML ="⛈";
      } else if (response.data.weather[0].description.includes("drizzle") === true) {
        weatherIcon.innerHTML ="🌦";
      } else if (response.data.weather[0].description.includes("snow") === true) {
        weatherIcon.innerHTML ="❄️";
      } else if (response.data.weather[0].description.includes("haze" || "smoke") === true) {
        weatherIcon.innerHTML ="🌫";
      } else {
        weatherIcon.innerHTML ="☀️";
      }
    
    //humidity
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;
  }
  axios
    .get(
      "https://api.openweathermap.org/data/2.5/weather?q=New+York&units=imperial&appid=dc249be89a0015c3980887c32be65599"
    )
    .then(getTemp);
  
  //Search Button
  function search(event) {
    event.preventDefault();
    let selectedCity = document.querySelector("#city-input");
    let searchInput = document.querySelector("#search-input");
    selectedCity.innerHTML = `${searchInput.value}`;
    let apiKey = "dc249be89a0015c3980887c32be65599";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=imperial&appid=${apiKey}`;
    axios.get(apiUrl).then(getTemp);
  }
  
  let submit = document.querySelector("#search-bar");
  submit.addEventListener("submit", search);
  
  //Current Position
  function showPosition(response) {
    let latitude = response.coords.latitude;
    let longitude = response.coords.longitude;
    let apiKey = "dc249be89a0015c3980887c32be65599";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
    axios.get(apiUrl).then(getTemp);
  }
  //current button
  function current(position) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  let buttonCurrent = document.querySelector("#current");
  buttonCurrent.addEventListener("click", current);
  
  //Tempeature F and C change

  function changeToC(event) {
    event.preventDefault();
    let degrees = document.querySelector("#degrees");
    degrees.innerHTML = Math.round((celsiusTemperature - 32) * (5 / 9));
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
  
    //feels like
    let feelsLike = document.querySelector("#feels-like");
    feelsLike.innerHTML = Math.round((feelsLikeTemperature - 32) * (5 / 9));
  }
  
  celsiusLink.addEventListener("click", changeToC);
  
  function changeToF(event) {
    event.preventDefault();
  
    let degrees = document.querySelector("#degrees");
    degrees.innerHTML = Math.round(fahrenheitTemperature);
  
   //feels like
   let feelsLike = document.querySelector("#feels-like");
   feelsLike.innerHTML = Math.round(feelsLikeTemperature);
  
    fahrenheitLink.classList.add("active");
    celsiusLink.classList.remove("active");
  }
  
  fahrenheitLink.addEventListener("click", changeToF);