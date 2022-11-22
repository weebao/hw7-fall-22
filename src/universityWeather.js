import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js";
import { fetchCurrentWeather } from "./fetchCurrentWeather.js";
import { fetchUniversities } from "./fetchUniversities.js";

export async function fetchUniversityWeather(query) {
  // Getting average of an array of number
  const avg = (arr) => arr.reduce((acc, cur) => acc + cur, 0) / arr.length;
  // Retrying fetch with 0.5s delay
  const wait = (timeout) => new Promise((res) => setTimeout(res, timeout));
  const retryFetchFunc = async (input, f, retries, delay) => {
    while (retries > 0) {
      try {
        return await f(input);
      } catch {
        --retries;
        await wait(delay);
      }
    }
    return Promise.reject(new Error("Failed to fetch after many retries"));
  };

  // Get list of universities from query, return error if length is 0
  const uniList = await fetchUniversities(query);
  if (uniList.length === 0)
    return Promise.reject(new Error("No results found for query."));

  // Get list of coordinates for each school, retry fetching 3 times with 0.5 s timeout
  const coordList = await Promise.all(
    uniList.map((uni) =>
      retryFetchFunc(uni, (x) => fetchLongitudeAndLatitude(x), 3, 500).then(
        (x) => ({ rej: false, name: uni, val: x }),
        (r) => ({ rej: true, name: uni, val: r })
      )
    )
  ).then((arr) => arr.filter((x) => !x.rej));

  // Get list of average temperatures for individual universities
  const tempList = await Promise.all(
    coordList.map((uni) =>
      fetchCurrentWeather(uni.val.lon, uni.val.lat).then((x) => ({
        name: uni.name,
        temp: avg(x.temperature_2m),
      }))
    )
  );

  // Convert into object and merge the total averaage
  const indAvgTemp = {};
  tempList.forEach((uni) => (indAvgTemp[uni.name] = uni.temp));
  return { totalAverage: avg(Object.values(indAvgTemp)), ...indAvgTemp };
}

export function fetchUMassWeather() {
  return fetchUniversityWeather("University of Massachusetts");
}

export function fetchUCalWeather() {
  return fetchUniversityWeather("University of California");
}
