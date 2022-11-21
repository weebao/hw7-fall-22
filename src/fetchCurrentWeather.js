import fetch from "node-fetch";

export function fetchCurrentWeather(longitude, latitude) {
  const searchURL = new URL(
    "https://api.open-meteo.com/v1/forecast?latitude=" +
      latitude +
      "&longitude=" +
      longitude +
      "&hourly=temperature_2m&temperature_unit=fahrenheit"
  );

  return fetch(searchURL.toString())
    .then((response) =>
      response.ok
        ? response.json()
        : Promise.reject(new Error(response.statusText))
    )
    .then((json) => ({
      time: json.hourly.time,
      temperature_2m: json.hourly.temperature_2m,
    }));
}
