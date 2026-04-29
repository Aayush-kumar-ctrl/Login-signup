const API = "http://localhost:5000/api/auth";

// -------------------- SIGNUP --------------------
function signup() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(API + "/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  })
  .then(async (res) => {
    const data = await res.json();

    // ❌ ERROR CASE
    if (!res.ok) {
      alert(data.message);   // show error (invalid email etc.)
      return;                // 🔥 STOP HERE (no redirect)
    }

    // ✅ SUCCESS CASE
    alert("Signup successful ✅");
    window.location.href = "login.html";
  })
  .catch(err => {
    alert("Server error ❌");
    console.log(err);
  });
}


// -------------------- LOGIN --------------------
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(API + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  .then(async (res) => {
    const data = await res.json();

    // ❌ ERROR CASE
    if (!res.ok) {
      alert(data.message);
      return;
    }

    // ✅ SUCCESS CASE
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    window.location.href = "dashboard.html";
  })
  .catch(err => {
    alert("Server error ❌");
    console.log(err);
  });
}