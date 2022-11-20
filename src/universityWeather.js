import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js"
import { fetchCurrentWeather } from "./fetchCurrentWeather.js"
import { fetchUniversities } from "./fetchUniversities.js"

export async function fetchUniversityWeather(query) {
  const avg = arr => arr.reduce((acc, cur) => acc + cur, 0) / arr.length

  const uniList = await fetchUniversities(query)
  const coordList = await Promise.all(uniList.map(uni => fetchLongitudeAndLatitude(uni)
                                                          .then(x => ({rej: false, name: uni, val: x}), 
                                                                r => ({rej: true, name: uni, val: r}))))
                                 .then(arr => arr.filter(x => {if (x.rej) console.log(`${x.name} failed because of ${x.val}`); return !x.rej}))

  const tempList = await Promise.all(coordList.map(uni => fetchCurrentWeather(uni.val.lon, uni.val.lat)
                                                          .then(x => ({name: uni.name, temp: avg(x.temperature_2m)}))))
  
  const indAvgTemp = {}
  tempList.forEach(uni => indAvgTemp[uni.name] = uni.temp)
  return {totalAverage: avg(Object.values(indAvgTemp)), ...indAvgTemp}
}

export function fetchUMassWeather() {
  return fetchUniversityWeather("University of Massachusetts")
}

export function fetchUCalWeather() {
  return fetchUniversityWeather("University of California")
}
