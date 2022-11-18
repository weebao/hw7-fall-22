import fetch from "node-fetch";

export function fetchLongitudeAndLatitude(query) {
  // Done by Bao
  // Initialize link and append query to the link
  const searchURL = new URL("https://geocode.maps.co/search")
  searchURL.searchParams.append("q", query)
  
  // Fetch data, then 
  return fetch(searchURL.toString())
          .then(response => response.json())
          .then(json => ({lon: Number(json[0].lon), lat: Number(json[0].lat)}))
}
