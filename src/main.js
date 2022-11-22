import fetch from "node-fetch"; // Third-party fetching library, fetch fully supported in Node.js 18+
import path from "node:path"; // Node.js standard library for resolving arbitrary paths (like those in a url)
import promptSync from "prompt-sync"; // Library for prompting through terminal
import { existsSync } from "node:fs"; // Function for checking if a file exists

import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js";
import { fetchCurrentWeather } from "./fetchCurrentWeather.js";
import { fetchUniversities } from "./fetchUniversities.js";
import {
  fetchUniversityWeather,
  fetchUMassWeather,
  fetchUCalWeather,
} from "./universityWeather.js";
import { readFromJSONFile, writeToJSONFile } from "./fileUtility.js";
const prompt = promptSync();

// Prompting user to write input into a JSON file
const writeToJSON = (data) => {
  let input = prompt(
    "Do you want to write this into a JSON File? (If yes, type Y): "
  );
  if (input.toLowerCase() === "y") {
    const path = prompt("Please type the name of the file: ");
    console.log("Creating file...");
    writeToJSONFile(`${path}.json`, data).then(
      console.log(`File ${path}.json is created`)
    );
  }
};

// Prompting user to read a JSON file
const readJSON = () => {
  let path = prompt("Please type the name of JSON file you want to read: ");
  console.log("Finding file...");
  if (existsSync(`${path}.json`)) {
    console.log("File found.");
    console.log(`Reading file ${path}.json...`);
    readFromJSONFile(`${path}.json`).then(console.log);
  } else {
    console.log(`File ${path}.json does not exist.`);
  }
};

// Prompting user to use any of the functions 1-6
const useFunction = (f, lonlat, noQuery) => {
  if (lonlat) {
    let lon = Number(prompt("Please input longitude: "));
    let lat = Number(prompt("Please input latitude: "));
    console.log("Loading...");
    f(lon, lat)
      .then((x) => {
        console.log(x);
        writeToJSON(x);
      })
      .catch((x) => console.log(`Your input resulted in an error (${x})`));
  } else {
    const q = noQuery ? "" : prompt("Please input query: ");
    console.log("Loading...");
    f(q)
      .then((x) => {
        console.log(x);
        writeToJSON(x);
      })
      .catch((x) => console.log(`Your input resulted in an error (${x})`));
  }
};

// Execute
console.log(`Please choose which function you want to use:
1 - fetchLongitudeAndLatitude
2 - fetchCurrentWeather
3 - fetchUniversities
4 - fetchUniversityWeather
5 - fetchUMassWeather  
6 - fetchUCalWeather
7 - readJSONFromFile
8 - exit`);

let input = prompt("Your input: ");

if (input === "1") {
  useFunction((x) => fetchLongitudeAndLatitude(x), false, false);
} else if (input === "2") {
  useFunction((x, y) => fetchCurrentWeather(x, y), true, false);
} else if (input === "3") {
  useFunction((x) => fetchUniversities(x), false, false);
} else if (input === "4") {
  useFunction((x) => fetchUniversityWeather(x), false, false);
} else if (input === "5") {
  useFunction((x) => fetchUMassWeather(x), false, true);
} else if (input === "6") {
  useFunction((x) => fetchUCalWeather(x), false, true);
} else if (input === "7") {
  readJSON();
}
