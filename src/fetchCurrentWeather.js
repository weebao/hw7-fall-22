import fetch from "node-fetch";

export function fetchCurrentWeather(longitude, latitude) {

  const searchURL = new URL("https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longtitude "40&hourly=temperature_2m&temperature_unit=fahrenheit"); 

  return fetch(searchURL.toString())
  .then(response => response.json).then({time: String(json[0].time), temperature_2m: Number(json[0].temperature_2m)}); 
}
