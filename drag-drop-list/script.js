const draggableListEl = document.getElementById("draggable-list");
const checkBtn = document.getElementById("check");

const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffet",
  "Bernard Arnault",
  "Carlos Slim",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page"
];

// store the list items
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
  // make a copy of the rich people list
  [...richestPeople]
    // map through the array to create an array of objects, with a name value and a random number
    .map(a => ({ value: a, sort: Math.random() }))
    // sort the array based on the random value
    .sort((a, b) => a.sort - b.sort)
    // return a new array of strings with names only
    .map(a => a.value)
    // for each person, create a list element, add an index attribute, and add html contents
    .forEach((person, index) => {
      const listItem = document.createElement("li");
      listItem.setAttribute("data-index", index);
      listItem.classList.add("draggable-list__entry");
      listItem.innerHTML = `
      <span class="draggable-list__number">${index + 1}</span>
      <div class="draggable-list__detail" draggable="true">
        <p class="draggable-list__name">${person}</p>
        <i class="fas fa-grip-lines draggable-list__icon"></i>
      </div>
    `;

      // add the elements t the listItems array and insert into DOM
      listItems.push(listItem);
      draggableListEl.appendChild(listItem);
    });

  addEventListeners();
}

// gets the position of the selected item
function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
}

// prevents the default behaviour of dragOver
function dragOver(e) {
  e.preventDefault();
}

// on dropping the item, gets the index of the drop target and fires a swapItems function
function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("draggable-list__entry--over");
}

// when the dragged item enters space over another item, adds an 'over' style modifier on that item
function dragEnter() {
  this.classList.add("draggable-list__entry--over");
}

// when the dragged item leaves the space over another item, removes the 'over' style modifier from that item
function dragLeave() {
  this.classList.remove("draggable-list__entry--over");
}

// swap items in the DOM
function swapItems(fromIndex, toIndex) {
  // get the picked up item and the target position item
  const itemOne = listItems[fromIndex].querySelector(".draggable-list__detail");
  const itemTwo = listItems[toIndex].querySelector(".draggable-list__detail");

  // swap the elements in the listItem array
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// check the order of the list
function checkOrder() {
  //gets the name and index of each item in the list
  listItems.forEach((listItem, index) => {
    const personName = listItem
      .querySelector(".draggable-list__detail")
      .innerText.trim();

    // if the item does not match the name in the original list at the same index, adds the 'wrong' style modified
    // if they match, it removes the 'wrong' modifier and adds the 'right' modifier
    if (personName !== richestPeople[index]) {
      listItem.classList.add("draggable-list__entry--wrong");
    } else {
      listItem.classList.remove("draggable-list__entry--wrong");
      listItem.classList.add("draggable-list__entry--right");
    }
  });
}

// add the event listeners to draggable items
function addEventListeners() {
  const dragListItems = document.querySelectorAll(".draggable-list__entry");
  const draggables = document.querySelectorAll(".draggable-list__detail");

  draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach(item => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

// add the click event listener to the 'check' button to trigger the checkOrder button
checkBtn.addEventListener("click", checkOrder);
