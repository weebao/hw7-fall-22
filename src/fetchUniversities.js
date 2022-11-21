import fetch from "node-fetch";

export function fetchUniversities(query) {
  // Initialize link and append query to the link
  const searchURL = new URL("https://university-web-api.herokuapp.com/search")
  searchURL.searchParams.append("name", query)
  
  // Fetch data, then return error if length is 0, else return list of school names
  return fetch(searchURL.toString())
          .then(response => response.ok ? response.json() : Promise.reject(new Error(response.statusText)))
          .then(json => json.map(schools => schools.name))
}
