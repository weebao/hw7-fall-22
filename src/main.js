import fetch from "node-fetch"; // Third-party fetching library, fetch fully supported in Node.js 18+
import path from "node:path"; // Node.js standard library for resolving arbitrary paths (like those in a url)
// Only needed in this case to join a url given by the API to another resource
import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js"

//testing
fetchLongitudeAndLatitude("Amherst").then(console.log);