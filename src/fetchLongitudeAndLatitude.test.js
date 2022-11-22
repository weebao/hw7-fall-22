import assert from "node:assert";
import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js";

test("fetchLongitudeAndLatitude follows type specification", () => {
  const promise = fetchLongitudeAndLatitude(
    "University of Massachusetts Amherst"
  );
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(typeof result === "object"); //  Assert the result is an object
    assert(typeof result.lon === "number"); // Assert that the lon value is a number
    assert(typeof result.lat === "number"); // Assert that the lat value is a number
    assert(Object.keys(result).length === 2); // Assert there are only two keys in the object
  });
});

// Extra tests by Bao Dang
test("fetchLongitudeAndLatitude rejects correctly with empty query", () => {
  const promise = fetchLongitudeAndLatitude("");
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

test("fetchLongitudeAndLatitude rejects correctly with weird query", () => {
  const promise = fetchLongitudeAndLatitude(
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
