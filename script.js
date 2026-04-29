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

  document.getElementById("result").textContent =
    `${bpm-5}-${bpm+5} BPM`;

  document.getElementById("cadences").textContent =
    `candence: ${(bpm*2)-5}-${(bpm*2)+5} steps/min`;

});