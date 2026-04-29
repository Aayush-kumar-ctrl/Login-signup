const API = "http://localhost:5000/api/auth";
const POST_API = "http://localhost:5000/api/posts";

// ---------------- SIGNUP ----------------
function signup() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(API + "/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  })
  .then(async res => {
    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Signup successful");
    window.location.href = "login.html";
  })
  .catch(() => alert("Server error"));
}

// ---------------- LOGIN ----------------
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(API + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  .then(async res => {
    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    window.location.href = "dashboard.html";
  })
  .catch(() => alert("Server error"));
}

// CREATE POST
function createPost() {
  const content = document.getElementById("content").value;
  const user = JSON.parse(localStorage.getItem("user"));

  fetch(POST_API + "/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: user.email,
      username: user.username,
      content
    })
  })
  .then(res => res.json())
  .then(() => {
    document.getElementById("content").value = "";
    loadPosts();
  });
}

// LOAD POSTS
function loadPosts() {
  fetch(POST_API + "/all")
    .then(res => res.json())
    .then(posts => {
      const feed = document.getElementById("feed");
      feed.innerHTML = "";

      posts.forEach(post => {
        feed.innerHTML += `
          <div class="post">
            <b>${post.username}</b>
            <p>${post.content}</p>
            <small>❤️ ${post.likes}</small>
            <br>
            <button onclick="likePost('${post._id}')">Like</button>
          </div>
        `;
      });
    });
}

// LIKE POST
function likePost(id) {
  fetch(POST_API + "/like/" + id, { method: "POST" })
    .then(() => loadPosts());
}

// AUTO LOAD FEED
if (window.location.pathname.includes("dashboard")) {
  loadPosts();
}