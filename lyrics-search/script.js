const formEl = document.getElementById("form");
const inputEl = document.getElementById("search");
const resultsEl = document.getElementById("results");
const moreEl = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

//search song or artist
async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();
  showData(data);
}

//show songs/artists in DOM
function showData(data) {
  resultsEl.innerHTML = `
    <ul class="songs">
      ${data.data
        .map(
          song => `
        <li class="songs__entry">
          <span><strong>${song.artist.name}</strong> - ${song.title}</span>
          <button class="btn btn--song" data-artist="${song.artist.name}" data-songTitle="${song.title}">Get Lyrics</button>
        </li>
      `
        )
        .join("")}
    </ul>
  `;

  //check if there is a link to a prev/next page of results, and generate a button for each option
  if (data.prev || data.next) {
    moreEl.innerHTML = `
      ${
        data.prev
          ? `<button class="btn btn--more" onclick="getMoreSongs('${data.prev}')">Prev</button>`
          : ""
      }
      ${
        data.next
          ? `<button class="btn btn--more" onclick="getMoreSongs('${data.next}')">Next</button>`
          : ""
      }
    `;
  } else {
    moreEl.innerHTML = "";
  }
}

// get previous/next page of results (uses proxy)
async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  showData(data);
}

// get lyrics for a song
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  // replace newline characters with line breaks
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
  resultsEl.innerHTML = `
    <h2 class="heading heading--secondary"><strong>${artist}</strong> - ${songTitle}</h2>
    <span>${lyrics}</span>
  `;

  moreEl.innerHTML = "";
}

//Event listeners
formEl.addEventListener("submit", e => {
  e.preventDefault();
  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert("Please type in the search term");
  } else {
    searchSongs(searchTerm);
  }
});

// Get lyrics button click

resultsEl.addEventListener("click", e => {
  const clickedEl = e.target;
  if (clickedEl.tagName === "BUTTON") {
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songTitle");
    getLyrics(artist, songTitle);
  }
});
