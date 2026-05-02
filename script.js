let songs = [];

async function loadSongs() {
  const response = await fetch("songs.json");
  songs = await response.json();

  console.log("Songs loaded:", songs.length);
}

loadSongs();

function convertMileTime(timeString){

  const parts = timeString.split(":");

  const minutes = Number(parts[0]);

  const seconds = Number(parts[1]);

  return minutes + (seconds / 60);
}

function calculateBPM(height, mileTime){

  const strideLength = height * 0.413;

  const strideFeet = strideLength / 12;

  const walkingStepsPerMile =
    5280 / strideFeet;

  const runningStepsPerMile =
    walkingStepsPerMile / 1.28;

  const cadence =
    runningStepsPerMile / mileTime;

  const bpm =
    cadence / 2;

  return Math.round(bpm);
}

const button =
  document.getElementById("generateBtn");

button.addEventListener("click", function(){

  const height =
    Number(document.getElementById("height").value);

  const mileTimeString =
    document.getElementById("mileTime").value;

  const mileTime =
    convertMileTime(mileTimeString);

  const bpm =
    calculateBPM(height, mileTime);

  const selectedGenre = document.getElementById("genreSelect").value;

  console.log("Selected genre:", selectedGenre);

// filter through songs
const matchingSongs = songs
  .filter(song =>
    song.bpm >= bpm - 5 &&
    song.bpm <= bpm + 5 &&
    song.genre === selectedGenre
  )
  .sort((a, b) =>
    Math.abs(a.bpm - bpm) - Math.abs(b.bpm - bpm)
  )
  .slice(0, 20);

document.getElementById("result").textContent =
  `${bpm - 5}-${bpm + 5} BPM`;

console.log(selectedGenre)
document.getElementById("cadences").textContent =
  `cadence: ${(bpm * 2) - 5}-${(bpm * 2) + 5} steps/min`;

let songHTML = "";
matchingSongs.forEach((song, index) => {
  songHTML += `
    <div class="song">
      <div class="song-left">
        <span class="song-index">${index + 1}</span>
        <div class="song-info">
          <h3>${song.name}</h3>
          <p>${song.artist}</p>
        </div>
      </div>
      <div class="song-right">
        <span class="song-bpm">${Math.round(song.bpm)} BPM</span>
      </div>
    </div>
  `;
});

songList.innerHTML = songHTML;

});