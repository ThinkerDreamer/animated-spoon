const lowerCaseLetters = ['a', 'b','c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's','t', 'u', 'v', 'w', 'x', 'y', 'z'];
const upperCaseLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const numbersZeroToNine = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const selectedSpecialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '-', '.', '~', '|', '<', '>', '=', '-', '_', '/', ':', ';', '?', '[', ']', '{', '}', '~'];
let allCharacters = []

function addCharToArr(arr) {
    for (let i = 0; i < arr.length; i++) {
        allCharacters.push(arr[i]);
    }
}

const lowerCaseToggle = document.querySelector("#lowercase-toggle");
const upperCaseToggle = document.querySelector("#uppercase-toggle");
const numbersToggle = document.querySelector("#numbers-toggle");
const specialCharsToggle = document.querySelector("#symbols-toggle");

const pw1El = document.querySelector("#pw1-el");
const pw2El = document.querySelector("#pw2-el");
const pw3El = document.querySelector("#pw3-el");
const pw4El = document.querySelector("#pw4-el");

// For the accessible button toggle
function toggle(btnID) {
    var theButton = document.getElementById(btnID);
    if (theButton.getAttribute("aria-pressed") == "false") {
      theButton.setAttribute("aria-pressed", "true");
    } else {
      theButton.setAttribute("aria-pressed", "false");
    }
  }



// Function to clear passwords each refresh
window.onload = function() {
    let passwordEls = document.querySelectorAll(".password");
    passwordEls.forEach(function(el) {
        el.value = "...";
      });
    }

function fillArray() {
  if (lowerCaseToggle.getAttribute("aria-pressed") == "true") {
    addCharToArr(lowerCaseLetters);
  }
  if (upperCaseToggle.getAttribute("aria-pressed") == "true") {
      addCharToArr(upperCaseLetters);
  }
  if (numbersToggle.getAttribute("aria-pressed") == "true") {
      addCharToArr(numbersZeroToNine);
  }
  if (specialCharsToggle.getAttribute("aria-pressed") == "true") {
      addCharToArr(selectedSpecialCharacters);
  }
}

// Generates one password
function genPswd() {
    let password = [];
    while (password.length < 18) {
        let randomIndex = Math.floor(Math.random() * allCharacters.length);
        password.push(allCharacters[randomIndex]);
    }
    console.log("Generating one password");
    return password.join("");
}

// Populates input fields with generated passwords
function generatePswds() {
  allCharacters = []; // reset the array
  fillArray(); // adds selected characters to allCharacters array
  pw1El.value = genPswd();
  pw2El.value = genPswd();
  pw3El.value = genPswd();
  pw4El.value = genPswd(); 
  console.log("All 4 passwords generated.");
}

function copy(pswdEl) {
    pswdEl.select(); // Select the text field
    pswdEl.setSelectionRange(0, 99999); /* For mobile devices */

    navigator.clipboard.writeText(pswdEl.value); // Copy the text inside the text field
    console.log("copied the text(?)");

    alert("Copied the text: " + pswdEl.value); // Alert the copied text
}
  