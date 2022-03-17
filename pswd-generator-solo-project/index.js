const lowerCaseLetters = ['a', 'b','c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's','t', 'u', 'v', 'w', 'x', 'y', 'z'];
const upperCaseLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const numbersZeroToNine = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const selectedSpecialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '-', '.', '~', '|', '<', '>', '=', '-', '_', '/', ':', ';', '?', '[', ']', '{', '}', '~'];
const allCharacters = []
function addCharToArr(arr) {
    for (let i = 0; i < arr.length; i++) {
        allCharacters.push(arr[i]);
    }
}
addCharToArr(lowerCaseLetters);
addCharToArr(upperCaseLetters);
addCharToArr(numbersZeroToNine);
addCharToArr(selectedSpecialCharacters);

let pw1El = document.querySelector("#pw1-el");
let pw2El = document.querySelector("#pw2-el");
let pw3El = document.querySelector("#pw3-el");
let pw4El = document.querySelector("#pw4-el");

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

// Generates one password
function genPswd() {
    /*todo: conditional logic for selecting
    a subset of characters to use*/
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
    pw1El.value = genPswd();
    pw2El.value = genPswd();
    pw3El.value = genPswd();
    pw4El.value = genPswd(); 
    console.log("All 4 passwords generated.");
}

function copy(pswdEl) {
    /* Select the text field */
    console.log("input was clicked");
    pswdEl.select();
    pswdEl.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(pswdEl.value);
    console.log("copied the text(?)");

    /* Alert the copied text */
    alert("Copied the text: " + pswdEl.value);
}
  