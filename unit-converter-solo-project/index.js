let input = 20;

let baseNum = document.querySelector("#base-num");
baseNum.textContent = input;

function numInputKeyPress() {
    let numInput = document.querySelector("#num-input");
    input = numInput.value;
    calculateConversion(input);
}

let lenResults = document.querySelector("#len-results");
let volResults = document.querySelector("#vol-results");
let massResults = document.querySelector("#mass-results");

function calculateConversion(input) {
    let metersResults = input * 3.28084;
    let feetResults = input * 0.3048;
    metersResults = metersResults.toFixed(3);
    feetResults = feetResults.toFixed(3);
    let litersResults = input * 0.264172;
    let gallonsResults = input * 3.78541;
    litersResults = litersResults.toFixed(3);
    gallonsResults = gallonsResults.toFixed(3);
    let kilogramsResults = input * 2.20462;
    let poundsResults = input * 0.453592;
    kilogramsResults = kilogramsResults.toFixed(3);
    poundsResults = poundsResults.toFixed(3);

    lenResults.textContent = input + " meters = " + metersResults + " feet | ";
    lenResults.textContent += input + " feet = " + feetResults + " meters";
    volResults.textContent = input + " liters = " + litersResults + " gallons | ";
    volResults.textContent += input + " gallons = " + gallonsResults + " liters";
    massResults.textContent = input + " kilograms = " + kilogramsResults + " pounds | ";
    massResults.textContent += input + " pounds = " + poundsResults + " kilograms";
    baseNum.textContent = input;
}

calculateConversion(input);