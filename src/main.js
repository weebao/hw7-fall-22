import fetch from "node-fetch"; // Third-party fetching library, fetch fully supported in Node.js 18+
import path from "node:path"; // Node.js standard library for resolving arbitrary paths (like those in a url)

import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js"
import { fetchCurrentWeather } from "./fetchCurrentWeather.js"
import { fetchUniversities } from "./fetchUniversities.js"
import { fetchUniversityWeather, fetchUMassWeather, fetchUCalWeather } from "./universityWeather.js"
import { readFromJSONFile, writeToJSONFile } from "./fileUtility.js"

//playing around
fetchLongitudeAndLatitude("boston").then(console.log, console.log)
fetchCurrentWeather(50,5432430).then(console.log, console.log)
fetchUniversities("california").then(console.log, console.log)