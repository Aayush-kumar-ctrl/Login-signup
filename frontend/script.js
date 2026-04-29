const API = "http://localhost:5000/api/auth";

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