let bill = 0;
let tipPercentage = 0;
let numberOfPeople = 0;
let buttonSelected = null;

let billInput = document.querySelector("#bill");
billInput.addEventListener("input", receiveBillValue);

function receiveBillValue() {
  bill = billInput.valueAsNumber || 0;
  calculate();
}

function receiveTipPercentage(value, button) {
  if (buttonSelected !== null) {
    buttonSelected.classList.remove("button-selected");
  }

  buttonSelected = button;
  buttonSelected.classList.add("button-selected");

  tipPercentage = value / 100;

  let customTipInput = document.querySelector("#custom-tip");
  customTipInput.value = "";
  calculate();
}

let tipButtons = document.querySelectorAll("button[id^='button-']");
tipButtons.forEach(button => {
  button.addEventListener("click", function() {
    let value = parseFloat(this.id.replace("button-", ""));
    receiveTipPercentage(value, this);
  });
});

function receiveCustomTipPercentage() {
  let customTipInput = document.querySelector("#custom-tip");
  tipPercentage = (customTipInput.valueAsNumber || 0) / 100;

  if (buttonSelected !== null) {
    buttonSelected.classList.remove("button-selected");
    buttonSelected = null;
  }

  calculate();
}

let numberOfPeopleInput = document.querySelector("#people");
numberOfPeopleInput.addEventListener("input", receiveNumberOfPeople);

function receiveNumberOfPeople() {
  numberOfPeople = numberOfPeopleInput.valueAsNumber || 0;
  calculate();
}

function calculate() {
  let tipAmountStrong = document.querySelector(".amount strong");
  let totalStrong = document.querySelector(".total strong");

  if (bill > 0 && tipPercentage > 0 && numberOfPeople > 0) {
    let tipAmountPerson = (bill * tipPercentage) / numberOfPeople;
    let total = (bill / numberOfPeople) + tipAmountPerson;

    tipAmountStrong.innerText = `$${tipAmountPerson.toFixed(2)}`;
    totalStrong.innerText = `$${total.toFixed(2)}`;
  } else {
    tipAmountStrong.innerText = "$0.00";
    totalStrong.innerText = "$0.00";
  }
}

function reset() {
  billInput.value = "";
  bill = 0;
  numberOfPeopleInput.value = "";
  numberOfPeople = 0;

  removeClassButtonSelected();
  tipPercentage = 0;

  document.querySelector(".amount strong").innerText = "$0.00";
  document.querySelector(".total strong").innerText = "$0.00";
  calculate();
}

function removeClassButtonSelected() {
  if (buttonSelected !== null) {
    buttonSelected.classList.remove("button-selected");
    buttonSelected = null;
  }
}
