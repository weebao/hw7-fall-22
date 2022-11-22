import assert from "node:assert";
import { fetchUniversities } from "./fetchUniversities.js";

test("fetchUniversities follows type specification", () => {
  const promise = fetchUniversities("University of Massachusetts Amherst");
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then(
    (result) => {
      assert(Array.isArray(result)); // Assert the result in an array
      assert(result.every((x) => typeof x === "string")); // Assert each element in the array is a string
    },
    (reason) => {
      assert(false);
    }
  );
});

// Extra tests by Bao Dang
test("fetchUniversities returns empty array for invalid query", () => {
  const promise = fetchUniversities("Some NonExistent School");
  assert(typeof promise === "object" && typeof promise.then === "function");

  // Assert that the promise will not reject and returns array of length 0
  return promise.then(
    (result) => {
      assert(Array.isArray(result)); // Assert the result in an array
      assert(result.length === 0); // Assert the array's length is 0
    },
    (reason) => {
      assert(false);
    }
  );
});

test("fetchUniversities returns array of strings that contains query", () => {
  const promise = fetchUniversities("Texas");
  assert(typeof promise === "object" && typeof promise.then === "function");

  return promise.then((result) => {
    assert(result.every((x) => x.toLowerCase().includes("texas")));
  });
});
