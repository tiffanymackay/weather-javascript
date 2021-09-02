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
  
  //Search Temp
  function getTemp(response) {
    let selectedCity = document.querySelector("#city-input");
    let searchInput = response.data.name;
    selectedCity.innerHTML = searchInput;
    //main temperature change
    let currentTemp = Math.round(response.data.main.temp);
    let newDegreeTemp = document.querySelector("#degrees");
    newDegreeTemp.innerHTML = `${currentTemp}`;
    //feels like
    let feelsLike = document.querySelector("#feels-like");
    feelsLike.innerHTML = Math.round(response.data.main.feels_like);
    //sky description
    let description = document.querySelector("#description");
    description.innerHTML = response.data.weather[0].description;
    //humidity
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;
  }
  /* navigator.geolocation.getCurrentPosition(showPosition); */
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
  let fahrenheitLink = document.querySelector("#fahrenheit");
  let celciusLink = document.querySelector("#celcius");
  
  function changeToC(event) {
    event.preventDefault();
    let degrees = document.querySelector("#degrees");
    degrees.innerHTML = Math.round((degrees.innerHTML - 32) * (5 / 9));
    fahrenheitLink.classList.remove("active");
    celciusLink.classList.add("active");
  
    //feels like
    let feelsLike = document.querySelector("#feels-like");
    feelsLike.innerHTML = Math.round((feelsLike.innerHTML - 32) * (5 / 9));
  }
  
  celciusLink.addEventListener("click", changeToC);
  
  function changeToF(event) {
    event.preventDefault();
  
    let degrees = document.querySelector("#degrees");
    degrees.innerHTML = Math.round(degrees.innerHTML * (9 / 5) + 32);
  
    //feels like
    let feelsLike = document.querySelector("#feels-like");
    feelsLike.innerHTML = Math.round(feelsLike.innerHTML * (9 / 5) + 32);
  
    fahrenheitLink.classList.add("active");
    celciusLink.classList.remove("active");
  }
  
  fahrenheitLink.addEventListener("click", changeToF);
  