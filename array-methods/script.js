const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const showMillionairesBtn = document.getElementById("show-millionaires");
const doubleBtn = document.getElementById("double");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money
async function getRandomUser() {
  // fetches api data
  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();
  const user = data.results[0];

  // creates a newUser object with name taken from the fetched api data
  // and adds a money property with random number
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);
}

// adds the passed object into the data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// double the money
function doubleMoney() {
  //maps over data array,
  // returning all properties of the original person with money doubled
  data = data.map(person => {
    return {
      ...person,
      money: person.money * 2
    };
  });
  updateDOM();
}

// filters list to millionaires only
function showMillionaires() {
  data = data.filter(person => person.money >= 1000000);
  updateDOM();
}

// sort the list
function sortList() {
  // descending sorting
  data = data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// calculate total wealth
function calculateWealth() {
  const total = data.reduce((prev, current) => (prev += current.money), 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    total
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

// Update DOM - uses default argument of data
function updateDOM(providedData = data) {
  //clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  //loop through the data array
  providedData.forEach(person => {
    // create a div for each person
    const elem = document.createElement("div");
    // add a 'person' class to the div
    elem.classList.add("person");
    // add the text to the element and formats the money amount
    elem.innerHTML = `<strong>${person.name}</strong> ${formatMoney(
      person.money
    )}`;
    // add the created element to the main div in the DOM
    main.appendChild(elem);
  });
}

// format number as money
function formatMoney(amount) {
  return "$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// event listeners

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
showMillionairesBtn.addEventListener("click", showMillionaires);
sortBtn.addEventListener("click", sortList);
calculateWealthBtn.addEventListener("click", calculateWealth);
