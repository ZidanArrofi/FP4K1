const region = document.querySelector("#search-region");
const btn = document.querySelector("#btn-submit");
let condition = document.querySelector("#condition");
let temperatur = document.querySelector("#temperature");
let humidity = document.querySelector("#humidity");
let pressure = document.querySelector("#pressure");
let uvLevel = document.querySelector("#uv");
let rain = document.querySelector("#rain");
let wind = document.querySelector("#winds");
let city = document.querySelector("#city");
let dateValue = document.querySelector("#date-value");
const inputDate = document.querySelector("#dateInput");
const inputTime = document.querySelector("#timeInput");
const timeValue = document.querySelector("#time-value");
const icon = document.querySelector("#icon-weather");
let today = new Date();
let dateNow = today.toLocaleDateString();
let timeNow = today.getHours();
const formatDate = (inputDate) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = new Date(inputDate).toLocaleDateString(
    "id-ID",
    options
  );
  return formattedDate;
};

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "b89895544bmshf148e7340c5603ep1d0908jsndb810a13fb9f",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

condition.innerHTML = "-";
temperatur.innerHTML = 0;
wind.innerHTML = 0;
humidity.innerHTML = 0;
pressure.innerHTML = 0;
rain.innerHTML = "%";
uvLevel.innerHTML = 0;

btn.addEventListener("click", (e) => {
  e.preventDefault();

  let fatchApi;
  if (inputDate.value == "") {
    fatchApi = fetch(
      `https://weatherapi-com.p.rapidapi.com/history.json?q=${region.value}&dt=${dateNow}&lang=en`,
      options
    );
  } else {
    fatchApi = fetch(
      `https://weatherapi-com.p.rapidapi.com/history.json?q=${region.value}&dt=${inputDate.value}&lang=en`,
      options
    );
  }

  fatchApi
    .then((response) => response.json())
    
    .then((response) => {

      condition.innerHTML =
        response.forecast.forecastday[0].hour[timeNow].condition.text;
      temperatur.innerHTML =
        response.forecast.forecastday[0].hour[timeNow].temp_c + " C";
      humidity.innerHTML =
        response.forecast.forecastday[0].hour[timeNow].humidity + " %";
      pressure.innerHTML =
        response.forecast.forecastday[0].hour[timeNow].pressure_mb + " mb";
      rain.innerHTML =
        response.forecast.forecastday[0].hour[timeNow].chance_of_rain + "%";
      wind.innerHTML =
        response.forecast.forecastday[0].hour[timeNow].wind_kph + " Km/h";
      uvLevel.innerHTML =
        "Level" + " " + response.forecast.forecastday[0].hour[timeNow].uv;
      city.innerHTML = response.location.name;
      dateValue.innerHTML = formatDate(response.forecast.forecastday[0].date);
      icon.setAttribute(
        "src",
        "https:" + response.forecast.forecastday[0].hour[timeNow].condition.icon
      );

      icon.classList.add("icon");
    })
    .catch((err) => {
      alert("Maksimal tanggal yang dapat diinput adalah h-7 dari hari ini");
      return;
    });
});
