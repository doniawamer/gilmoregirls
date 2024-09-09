const fs = require("fs");
const readline = require("readline");
const { trimSpaces } = require("./util");
const { Season } = require("./Season");

const filePath = "./data.txt";

const fileStream = fs.createReadStream(filePath);

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity,
});

let seasonName;
let currentSeason;
let currentEpisode;
let data = [];

// Event handler for each line read
rl.on("line", (line) => {
  const cleanedLine = trimSpaces(line);

  // Skip empty lines
  if (cleanedLine !== "") {
    // new Season or Episode
    if (cleanedLine.includes("Gilmore Girls")) {
      const title = trimSpaces(cleanedLine.split("-")[0]);
      const season = trimSpaces(cleanedLine.split("-")[1].split(",")[0]);
      const episode = trimSpaces(cleanedLine.split("-")[1].split(",")[1]);

      // new season
      if (seasonName !== season) {
        // if it's not the first season, push the completed season
        if (seasonName !== undefined) {
          data.push(currentSeason);
        }

        const formattedSeasonName = title?.includes(":")
          ? title.split(":")[1]
          : season;
        const newSeason = new Season(formattedSeasonName, title);
        const newEpisode = newSeason.addEpisode(episode);

        seasonName = season;
        currentSeason = newSeason;
        currentEpisode = newEpisode;
      }
      // same season, new epi
      else {
        const newEpisode = currentSeason.addEpisode(episode);
        currentEpisode = newEpisode;
      }
    }
    // books
    else {
      const _line = cleanedLine.split(" by ");
      const book = trimSpaces(_line[0]);
      const author = _line.length > 1 ? trimSpaces(_line[1]) : "";

      currentEpisode.addBook(book, author);
    }
  }
});

// Event handler on completion

rl.on("close", () => {
  data.push(currentSeason);

  // export data
  const dataString = JSON.stringify(data, null, 2);
  const fileContent = `module.exports = ${dataString};`;

  fs.writeFileSync("./data.js", fileContent);
});
