export function fetchCurrentWeather(longitude, latitude) {

  const searchURL = new URL("https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longtitude "40&hourly=temperature_2m&temperature_unit=fahrenheit"); 

  searchURL.searchParams.append("q", query); 

  return fetch("https://api.open-meteo.com/v1/forecast?latitude=40&longitude=40&hourly=temperature_2m&temperature_unit=fahrenheit")
  .then(response => response.json).then({time: String(json[0].time), temperature_2m: Number(json[0].temperature_2m)}); 
}
