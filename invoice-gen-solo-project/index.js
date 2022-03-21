const itemList = document.querySelector("#item-list");
const priceList = document.querySelector("#price-list");
const trialBtn = document.querySelector("#trial-btn");
const thirtyBtn = document.querySelector("#thirty-btn");
const fortyFiveBtn = document.querySelector("#forty-five-btn");
const totalEl = document.querySelector("#total-el");
const sendBtn = document.querySelector("#send-btn");
let lessonsRequested = [];
let totalPrice = 0;

function render() {
    itemList.innerHTML = "";
    priceList.innerHTML = "";
    for (let i = 0; i < lessonsRequested.length; i++) {
        let itemName = document.createElement("li");
        itemName.textContent = lessonsRequested[i].name;
        itemName.setAttribute("class", "left-align");
        itemList.append(itemName);
        let itemPrice = document.createElement("li");
        priceList.append(itemPrice);
        itemPrice.textContent = `\$${lessonsRequested[i].price}`;
        itemPrice.setAttribute("class", "right-align");
    }
    totalEl.textContent = `\$${totalPrice}`;
}

trialBtn.addEventListener("click", function(){
    lessonsRequested.push({name: "30-minute trial lesson", price: 10});
    totalPrice += 10;
    trialBtn.setAttribute("disabled", "disabled");
    render();
})

thirtyBtn.addEventListener("click", function(){
    lessonsRequested.push({name: "30-minute regular lesson", price: 15});
    totalPrice += 15;
    thirtyBtn.setAttribute("disabled", "disabled");
    render();
})

fortyFiveBtn.addEventListener("click", function(){
    lessonsRequested.push({name: "45-minute regular lesson", price: 25});
    totalPrice += 25;
    fortyFiveBtn.setAttribute("disabled", "disabled");
    render();
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