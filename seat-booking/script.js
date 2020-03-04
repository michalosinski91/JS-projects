const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

// Runs function to check localStorage and update UI with retrieved data
populateUI();

let ticketPrice = +movieSelect.value;

// Updates seat count & price total
function updateSelectedCount() {
  // Finds all seats with class 'selected'
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  // creates a copy of selectedSeats array and maps over it to find indexes
  // of all currently selected seats within the seats array (all un-occupied seats)
  // returns an array of indexes
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  //saves the selectedSeats data in localStorage
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  // Gets the length of the selectedSeats array
  const selectedSeatsCount = selectedSeats.length;
  // Changes the text of the seat count html element
  count.innerText = selectedSeatsCount;
  // calculates the price of selected seats and updates the total html element
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Saves index of selected movie and its price in localStorage
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Event fired on movie selection change - updates total price of seats
movieSelect.addEventListener("change", ({ target }) => {
  ticketPrice = +target.value;
  //passes movie selection data to localStorage function
  setMovieData(target.selectedIndex, target.value);
  // triggers update
  updateSelectedCount();
});

//retrives data from localStorage and updates UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  //checks if selectedSeats item exists and is not an empty array
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      // finds index of any 'selected' seat in the unoccupied seat array
      // and adds a 'selected' class to it
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  //retrieves the selectedMovie data from localStorage
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  // if that item exists, it updates the movieSelect data
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Event fired on clicking unoccupied seats - toggles a seat between free and selected
// and updates the seat count and price
container.addEventListener("click", ({ target }) => {
  if (
    target.classList.contains("seat") &&
    !target.classList.contains("occupied")
  ) {
    target.classList.toggle("selected");
    updateSelectedCount();
  }
});

// triggers the initial calculation of seats & price after the initial localStorage data retrieved
updateSelectedCount();
