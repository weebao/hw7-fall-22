import fetch from "node-fetch"; // Third-party fetching library, fetch fully supported in Node.js 18+
import path from "node:path"; // Node.js standard library for resolving arbitrary paths (like those in a url)

import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js"
import { fetchCurrentWeather } from "./fetchCurrentWeather.js"
import { fetchUniversities } from "./fetchUniversities.js"
import { fetchUniversityWeather, fetchUMassWeather, fetchUCalWeather } from "./universityWeather.js"
import { readFromJSONFile, writeToJSONFile } from "./fileUtility.js"

const writeToJSON = (data) => {
  const input = prompt('Do you want to write this into a JSON File? (If yes, type Y): ')
  if (input.toLowerCase() === 'y') {
    const path = prompt('Please type the name of the file: ')
    writeToJSONFile(`${path}.json`, data)
  }
}

const useFunction = (f, lonlat) => {
  if (lonlat) {
    const lon = prompt('Please input longitude: ') 
    const lat = prompt('Please input latitude: ') 
    f(lon, lat).then(x => {
      console.log(x)
      writeToJSON(x)
    })
  }
  else {
    const q = prompt('Please input query: ')
    f(q).then(x => {
      console.log(x)
      writeToJSON(x)
    })
  }
}

while (true) {
  const input = prompt(`Please choose which function you want to use:\n
                        1 - fetchLongitudeAndLatitude
                        2 - fetchCurrentWeather
                        3 - fetchUniversities
                        4 - fetchUniversityWeather
                        5 - fetchUMassWeather  
                        6 - fetchUCalWeather
                        7 - exit`)
  if (input === '7') break;
  if (input === '1') {
    useFunction(x => fetchLongitudeAndLatitude(x), false)
  }
  else if (input === '2') {
    useFunction(x => fetchCurrentWeather(x), true)
  }
  else if (input === '3') {
    useFunction(x => fetchUniversities(x), false)
  }
  else if (input === '4') {
    useFunction(x => fetchUniversityWeather(x), false)
  }
  else if (input === '5') {
    useFunction(x => fetchUMassWeather(x), false)
  }
  else if (input === '6') {
    useFunction(x => fetchUCalWeather(x), false)
  }
  else {
    continue;
  }
}