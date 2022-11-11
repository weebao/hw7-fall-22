import fetch from "node-fetch"; // Third-party fetching library, fetch fully supported in Node.js 18+
import path from "node:path"; // Node.js standard library for resolving arbitrary paths (like those in a url)
// Only needed in this case to join a url given by the API to another resource

fetch("https://spire-api.melanson.dev/instructors/?search=marius+minea") // fetch the /instructions resource with a "search" parameter
  .then((response) => response.json()) // parse the result to a json
  .then(
    (json) =>
      Array.isArray(json.results) && json.results.length > 0 // This API returns an object with a "results" field as an array of objects
        ? Promise.resolve(json.results[0]) // Resolve with the first object if present, an object with a url, name, and id
        : Promise.reject(new Error("No results found.")) // Reject if nothing is present
  )
  .then((data) => fetch(path.join(data.url, "/sections/"))) // Fetch the associated /sections resource for an instructor page
  .then((res) => res.json()) // Parse the section results
  .then((json) => console.log(`Marius Minea has taught ${json.count} different sections at UMass!`)) // Do something with the final result
  .catch((err) => console.log("Unable to retrieve location data: " + err));