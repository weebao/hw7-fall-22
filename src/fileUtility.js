import { readFile, writeFile } from "node:fs/promises";

// Completed by Bao Dang
export function writeToJSONFile(path, data) {
  // TODO
  return writeFile(path, JSON.stringify(data, null, 1));
}

export function readFromJSONFile(path) {
  // TODO
  return readFile(path).then((str) => JSON.parse(str));
}
