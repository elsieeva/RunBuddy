import fs from "fs";
import csv from "csv-parser";

const results = [];

fs.createReadStream("dataset.csv")
  .pipe(csv())
  .on("data", (row) => {
    results.push({
      id: row.track_id,
      name: row.track_name,
      artist: row.artists,
      bpm: Number(row.tempo),
      energy: Number(row.energy),
      valence: Number(row.valence),
      genre: row.track_genre
    });
  })
  .on("end", () => {
    fs.writeFileSync(
      "cleanSongs.json",
      JSON.stringify(results, null, 2)
    );
    console.log("Done!");
  });