const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

class UserManager {
  constructor() {
    this.users = [];
  }

  findUser(username) {
    const key = username?.trim();
    if (!key) return undefined;
    return this.users.find((user) => user.username === key);
  }

  register(username, email, password) {
    const trimmed = username?.trim();
    if (!trimmed) {
      throw new Error("Username cannot be empty");
    }
    if (!emailRegex.test(String(email))) {
      throw new Error("Please enter a valid email address");
    }
    if (String(password).length < 6) {
      throw new Error("Password must be at least 6 characters");
    }
    if (this.findUser(trimmed)) {
      throw new Error("That username is already taken");
    }
    if (this.users.some((u) => u.email === email)) {
      throw new Error("That email is already registered");
    }
    this.users.push(new User(trimmed, email, password));
  }

  login(username, password) {
    const trimmed = username?.trim();
    if (!trimmed) {
      throw new Error("Username cannot be empty");
    }
    if (password == null || String(password).length === 0) {
      throw new Error("Password is required");
    }
    const user = this.findUser(trimmed);
    if (!user || user.password !== password) {
      throw new Error("Invalid username or password");
    }
    return user;
  }
}

const userManager = new UserManager();

const messageEl = document.querySelector("#message");
const tabLogin = document.querySelector("#tab-login");
const tabSignup = document.querySelector("#tab-signup");
const loginPanel = document.querySelector("#login-panel");
const signupPanel = document.querySelector("#signup-panel");
const loginForm = document.querySelector("#login-form");
const signupForm = document.querySelector("#signup-form");

function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = "message";
  messageEl.classList.add(type);
  messageEl.removeAttribute("hidden");
  void messageEl.offsetWidth;
  messageEl.classList.add("visible");
  if (type === "error") {
    messageEl.classList.add("shake");
    const onEnd = () => messageEl.classList.remove("shake");
    messageEl.addEventListener("animationend", onEnd, { once: true });
  }
}

function hideMessageSoon(ms = 3200) {
  window.clearTimeout(showMessage._t);
  showMessage._t = window.setTimeout(() => {
    messageEl.classList.remove("visible");
  }, ms);
}

function setPanel(panel) {
  const isLogin = panel === "login";
  tabLogin.classList.toggle("active", isLogin);
  tabSignup.classList.toggle("active", !isLogin);
  tabLogin.setAttribute("aria-selected", String(isLogin));
  tabSignup.setAttribute("aria-selected", String(!isLogin));
  loginPanel.classList.toggle("active", isLogin);
  signupPanel.classList.toggle("active", !isLogin);
  loginPanel.hidden = !isLogin;
  signupPanel.hidden = isLogin;
}

tabLogin.addEventListener("click", () => setPanel("login"));
tabSignup.addEventListener("click", () => setPanel("signup"));

if (location.hash === "#signup") {
  setPanel("signup");
}

window.addEventListener("hashchange", () => {
  if (location.hash === "#signup") setPanel("signup");
  else if (location.hash === "#login") setPanel("login");
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(loginForm));
  const { username, password } = data;
  try {
    const user = userManager.login(username, password);
    showMessage(`Welcome back, ${user.username}!`, "success");
    hideMessageSoon(4000);
    loginForm.reset();
  } catch (err) {
    showMessage(err.message, "error");
    hideMessageSoon(5000);
  }
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(signupForm));
  const { username, email, password } = data;
  try {
    userManager.register(username, email, password);
    showMessage("Account created. You can log in now.", "success");
    hideMessageSoon(4000);
    signupForm.reset();
    setPanel("login");
    location.hash = "login";
  } catch (err) {
    showMessage(err.message, "error");
    hideMessageSoon(5000);
  }
});
