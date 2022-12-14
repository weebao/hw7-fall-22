import assert from "node:assert";
import {
  fetchUniversityWeather,
  fetchUCalWeather,
  fetchUMassWeather,
} from "./universityWeather.js";
import { fetchUniversities } from "./fetchUniversities.js";

test("fetchUCalWeather follows type specification", () => {
  const promise = fetchUCalWeather();
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then(
    (result) => {
      assert(typeof result === "object");
      assert(Object.keys(result).every((x) => typeof x === "string"));
      assert(Object.values(result).every((x) => typeof x === "number"));
    },
    (reason) => {
      assert(false);
    }
  );
});

test("fetchUMassWeather follows type specification", () => {
  const promise = fetchUMassWeather();
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then(
    (result) => {
      assert(typeof result === "object");
      assert(Object.keys(result).every((x) => typeof x === "string"));
      assert(Object.values(result).every((x) => typeof x === "number"));
    },
    (reason) => {
      assert(false);
    }
  );
});

// Extra tests by Bao Dang
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

test("fetchUniversityWeather returns the same number of universities under normal condition", async () => {
  const promise = fetchUniversityWeather("texas");
  const uniPromise = fetchUniversities("texas");
  assert(typeof promise === "object" && typeof promise.then === "function");

  const result = await promise;
  const uniList = await uniPromise;
  assert(uniList.length === Object.keys(result).length - 1);
});

// Tests by Ceilidh Scott
test("fetchUMass returns correctly", () => {
  const promise = fetchUMassWeather();
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then(
    (result) => {
      let uniList = Object.keys(result);
      assert(uniList.includes("University of Massachusetts Boston"));
      assert(uniList.includes("University of Massachusetts Amherst"));
      assert(uniList.includes("University of Massachusetts Dartmouth"));
      assert(uniList.includes("University of Massachusetts Lowell"));
    },
    (reason) => {
      assert(false);
    }
  );
});
