const itemList = document.querySelector("#item-list");
const priceList = document.querySelector("#price-list");
const trialBtn = document.querySelector("#trial-btn");
const thirtyBtn = document.querySelector("#thirty-btn");
const fortyFiveBtn = document.querySelector("#forty-five-btn");
const totalEl = document.querySelector("#total-el");
const sendBtn = document.querySelector("#send-btn");
let totalPrice = 0;

function updateTotalPrice() {
    totalEl.textContent = `\$${totalPrice}`;
}

trialBtn.addEventListener("click", function(){
    let itemName = document.createElement("li");
    itemName.textContent = "30-minute trial lesson";
    itemName.setAttribute("class", "left-align");
    itemList.append(itemName);
    let itemPrice = document.createElement("li");
    priceList.append(itemPrice);
    itemPrice.textContent = "$10";
    itemPrice.setAttribute("class", "right-align");
    totalPrice += 10;
    trialBtn.setAttribute("disabled", "disabled");
    updateTotalPrice();
})

thirtyBtn.addEventListener("click", function(){
    let itemName = document.createElement("li");
    itemName.textContent = "30-minute regular lesson";
    itemName.setAttribute("class", "left-align");
    itemList.append(itemName);
    let itemPrice = document.createElement("li");
    priceList.append(itemPrice);
    itemPrice.textContent = "$15";
    itemPrice.setAttribute("class", "right-align");
    totalPrice += 15;
    thirtyBtn.setAttribute("disabled", "disabled");
    updateTotalPrice();
})

fortyFiveBtn.addEventListener("click", function(){
    let itemName = document.createElement("li");
    itemName.textContent = "45-minute regular lesson";
    itemName.setAttribute("class", "left-align");
    itemList.append(itemName);
    let itemPrice = document.createElement("li");
    priceList.append(itemPrice);
    itemPrice.textContent = "$25";
    itemPrice.setAttribute("class", "right-align");
    totalPrice += 25;
    fortyFiveBtn.setAttribute("disabled", "disabled");
    updateTotalPrice();
})

sendBtn.addEventListener("click", function(){
    if (itemList.childElementCount > 0) {
        itemList.innerHTML = "";
        priceList.innerHTML = "";
        alert("Invoice sent! Thank you very much!");
        totalPrice = 0;
        updateTotalPrice();
        trialBtn.disabled = false;
        thirtyBtn.disabled = false;
        fortyFiveBtn.disabled = false;
    }
})