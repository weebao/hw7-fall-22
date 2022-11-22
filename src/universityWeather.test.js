import assert from "node:assert";
import {
  fetchUniversityWeather,
  fetchUCalWeather,
  fetchUMassWeather,
} from "./universityWeather.js";

test("fetchUCalWeather follows type specification", () => {
  const promise = fetchUCalWeather();
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(typeof result === "object");
    assert(Object.keys(result).every((x) => typeof x === "string"));
    assert(Object.values(result).every((x) => typeof x === "number"));
  });
});

test("fetchUMassWeather follows type specification", () => {
  const promise = fetchUMassWeather();
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(typeof result === "object");
    assert(Object.keys(result).every((x) => typeof x === "string"));
    assert(Object.values(result).every((x) => typeof x === "number"));
  });
});

test("fetchUniversityWeather rejects correctly with empty query", () => {
  const promise = fetchUniversityWeather("");
  assert(typeof promise === "object" && typeof promise.then === "function");

  // Assert that the promise will reject with an error
  return promise.then(
    (result) => {
      assert(false);
    },
    (reason) => {
      assert(reason instanceof Error);
    }
  );
});

test("fetchUniversityWeather rejects correctly with weird query", () => {
  const promise = fetchUniversityWeather(
    "Something Random Here That Doesn't Exist"
  );
  assert(typeof promise === "object" && typeof promise.then === "function");

  // Assert that the promise will reject with an error
  return promise.then(
    (result) => {
      assert(false);
    },
    (reason) => {
      assert(reason instanceof Error);
    }
  );
});
