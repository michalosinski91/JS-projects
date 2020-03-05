const currencyEl_one = document.getElementById("currency-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_one = document.getElementById("amount-one");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// Fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(
    ` https://prime.exchangerate-api.com/v5/e78881336f07ee509c16477b/latest/${currency_one}`
  )
    .then(res => res.json())
    .then(data => {
      // pulls the conversion rate of desired currency from the fetch result
      const rate = data.conversion_rates[currency_two];
      // sets the exchange rate element text
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      // calculates the second value and limits it to 2 decimal places
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

// Event Listeners
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

// when 'Swap' button is clicked, the values of currency elements are swapped and calculate function ran
swap.addEventListener("click", () => {
  [currencyEl_two.value, currencyEl_one.value] = [
    currencyEl_one.value,
    currencyEl_two.value
  ];
  calculate();
});

// runs initial calculation
calculate();
