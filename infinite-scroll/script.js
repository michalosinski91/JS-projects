const postsContainer = document.getElementById("posts-container");
const loaderEl = document.querySelector(".loader");
const filterEl = document.getElementById("filter");

let limit = 5;
let page = 1;

// Fetch posts from API
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
      }
    }
  );
  const data = await res.json();
  return data;
}

// show posts in DOM
async function showPosts() {
  const posts = await getPosts();

  posts.forEach(post => {
    const postEl = document.createElement("div");
    postEl.classList.add("posts__entry");
    postEl.innerHTML = `
    <div class="posts__number">${post.id}</div>
    <div class="posts__info">
      <h2 class="posts__title">${post.title}</h2>
      <p class="posts__body">
        ${post.body}
      </p>
    </div>
    `;
    postsContainer.appendChild(postEl);
  });
}

// show loader and fetch more posts
function showLoading() {
  loaderEl.classList.add("loader--show");
  setTimeout(() => {
    loaderEl.classList.remove("loader--show");
    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

// Filter posts
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".posts__entry");
  posts.forEach(post => {
    const title = post.querySelector(".posts__title").innerText.toUpperCase();
    const body = post.querySelector(".posts__body").innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

// initial fetch
showPosts();

//Event listeners

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    // show the loader
    showLoading();
  }
});

filterEl.addEventListener("input", filterPosts);
