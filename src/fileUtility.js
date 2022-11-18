import { readFile, writeFile } from "node:fs/promises";

export function writeToJSONFile(path, data) {
  // TODO
  return writeFile(path, JSON.stringify(data), { encoding })
}

export function readFromJSONFile(path) {
  // TODO
  return readFile(path, { encoding }).then(str => JSON.parse(str))
}
