import fetch from "node-fetch";

export function fetchLongitudeAndLatitude(query) {
  // Initialize link and append query to the link
  const searchURL = new URL("https://geocode.maps.co/search")
  searchURL.searchParams.append("q", query)
  
  // Fetch data, then get lon and lat, return error if length is 0
  return fetch(searchURL.toString())
          .then(response => response.ok ? response.json() : new Error("The server is probably down."))
          .then(json => json.length === 0 ? new Error("No results found for query.")
                                          : ({lon: Number(json[0].lon), lat: Number(json[0].lat)}))
}
