import assert from "node:assert";
import { fetchCurrentWeather } from "./fetchCurrentWeather.js";

test("fetchCurrentWeather follows type specification", () => {
  const promise = fetchCurrentWeather(42.36, -71.05);
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then(
    (result) => {
      assert(typeof result === "object"); // Assert the result is an object
      assert(Array.isArray(result.time)); // Assert the result has an array time field
      assert(result.time.every((x) => typeof x === "string")); // Assert each element in that time is a sting
      assert(Array.isArray(result.temperature_2m)); // Assert the result as an array temperature_2m field
      assert(result.temperature_2m.every((x) => typeof x === "number")); // Assert each element in that time is a number
    },
    (reason) => assert(false)
  );
});

test("fetchCurrentWeather rejects with out of range coordinates", () => {
  const promise = fetchCurrentWeather(542354432, 542354325);
  assert(typeof promise === "object" && typeof promise.then === "function");

  // Assert that the promise will reject with an error
  return promise.then(
    (result) => {
      assert(false);
    },
    (reason) => assert(reason instanceof Error)
  );
});

test("fetchCurrentWeather rejects with invalid coordinates", () => {
  const promise = fetchCurrentWeather(true, false);
  assert(typeof promise === "object" && typeof promise.then === "function");

  // Assert that the promise will reject with an error
  return promise.then(
    (result) => {
      assert(false);
    },
    (reason) => assert(reason instanceof Error)
  );
});
