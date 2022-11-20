import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js"
import { fetchCurrentWeather } from "./fetchCurrentWeather.js"
import { fetchUniversities } from "./fetchUniversities.js"

export function fetchUniversityWeather(query) {
  async function fetchHelper(q) {
    const avg = arr => arr.reduce((acc, cur) => acc + cur, 0) / arr.length
  
    const uniList = await fetchUniversities(q)
    const coordList = await Promise.all(uniList.map(fetchLongitudeAndLatitude))
    const tempList = await Promise.all(coordList.map(coord => "lon" in coord ? 
                                                      fetchCurrentWeather(coord.lon, coord.lat).then(x => avg(x.temperature_2m)) :
                                                      Promise.resolve(undefined)))
    const indAvgTemp = {};
    uniList.forEach((uni, ind) => tempList[ind] === undefined ? 0 : indAvgTemp[uni] = tempList[ind])
    return {totalAverage: avg(Object.values(indAvgTemp)), ...indAvgTemp}
  }
  return fetchHelper(query)
}

export function fetchUMassWeather() {
  return fetchUniversityWeather("University of Massachusetts")
}

export function fetchUCalWeather() {
  return fetchUniversityWeather("University of California")
}
