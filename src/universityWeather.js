import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js"
import { fetchCurrentWeather } from "./fetchCurrentWeather.js"
import { fetchUniversities } from "./fetchUniversities.js"

export function fetchUniversityWeather(query) {
  return query.fetchCurrentWeather.then(query.filter(x => x.equals(query)).then(query.isEmpty() ? new Error("No results found for query."):
}

export function fetchUMassWeather() {
  // TODO:

}

export function fetchUCalWeather() {
  // TODO
}
