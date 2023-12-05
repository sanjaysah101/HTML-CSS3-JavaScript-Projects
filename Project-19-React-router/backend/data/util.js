const fs = require("node:fs/promises");

async function readData() {
  try {
    const data = await fs.readFile("events.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Failed to read data.");
  }
}

async function writeData(data) {
  try {
    await fs.writeFile("events.json", JSON.stringify(data));
  } catch (error) {
    throw new Error("Failed to write data.");
  }
}

module.exports = { readData, writeData };
