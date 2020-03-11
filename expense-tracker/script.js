const balanceEl = document.getElementById("balance");
const totalIncomeEl = document.getElementById("total-income");
const totalExpenseEl = document.getElementById("total-expense");
const listEl = document.getElementById("list");
const formEl = document.getElementById("form");
const textEl = document.getElementById("text");
const amountEl = document.getElementById("amount");
const submitBtn = document.getElementById("submit");
/*
const dummyTransactions = [
  {
    id: 1,
    text: "Salary",
    amount: 300
  },
  {
    id: 2,
    text: "Book",
    amount: -10
  },
  {
    id: 3,
    text: "Camera",
    amount: -150
  }
];

*/

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign (positive/negative amount)
  const sign = transaction.amount < 0 ? "-" : "+";

  // create new element
  const item = document.createElement("li");
  // Add class based on value
  item.classList.add("history__entry");
  item.classList.add(
    transaction.amount < 0
      ? "history__entry--negative"
      : "history__entry--positive"
  );
  // Add the content
  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="history__button" onClick="deleteTransaction(${
    transaction.id
  })">x</button>
  `;
  // Append the item to the list element
  listEl.appendChild(item);
}

// Updat the balance, income & expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balanceEl.innerText = `$${total}`;
  totalIncomeEl.innerText = `$${income}`;
  totalExpenseEl.innerText = `$${expense}`;
}

// Add new transaction
function addTransaction(e) {
  e.preventDefault();
  //gets values of text and amount form fields
  let text = textEl.value.trim();
  let amount = +amountEl.value.trim();
  //checks if text and amount fields are filled in
  if (!text) {
    alert("Please add transaction text");
  } else if (!amount) {
    alert("Please add transaction amount");
  } else {
    //generate random id
    let id = Math.floor(Math.random() * 1000000);
    // create transaction object
    let transaction = {
      text,
      amount,
      id
    };
    console.log(transaction);
    //add new transaction object to the transactions array
    transactions.push(transaction);
    //update the balance, income & expense
    updateValues();
    // update the dom with new transaction
    addTransactionDOM(transaction);
    //update local storage
    updateLocalStorage();
    //clear the form
    textEl.value = "";
    amountEl.value = null;
  }
}

//delete transaction
function deleteTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id != id);
  updateLocalStorage();
  init();
}

// Update local storage
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Initial run
function init() {
  listEl.innerHTML = "";
  transactions.forEach(transaction => addTransactionDOM(transaction));
  updateValues();
}

// Event listeners
submitBtn.addEventListener("click", addTransaction);

init();
