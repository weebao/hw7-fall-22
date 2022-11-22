import fetch from "node-fetch";

export function fetchLongitudeAndLatitude(query) {
  // Completed by Bao Dang
  // Initialize link and append query to the link
  const searchURL = new URL("https://geocode-cache.herokuapp.com/search");
  searchURL.searchParams.append("q", query);

  // Fetch data, then get lon and lat, return error if length is 0
  return (
    fetch(searchURL.toString())
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response.statusText)
      )
      // Reject if length is 0 or json rejects, else return
      .then(
        (json) =>
          json.length === 0
            ? Promise.reject(new Error("No results found for query."))
            : { lon: Number(json[0].lon), lat: Number(json[0].lat) },
        (reason) => Promise.reject(new Error(reason))
      )
  );
}
