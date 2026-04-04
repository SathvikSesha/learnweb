const form = document.querySelector("form");
const msg = document.querySelector("#msg");
let regform = {
  name: "",
  rollno: "",
  branch: "",
  email: "",
  pno: "",
};
form.addEventListener("change", (e) => {
  let { name, value } = e.target;
  regform = {
    ...regform,
    [name]: value,
  };
});
function handleSubmit(e) {
  e.preventDefault();
  if (regform.name.length == 0) {
    errorMsg("name is required", false);
    return;
  }
  if (regform.rollno.length == 0) {
    errorMsg("Roll number is required", false);
    return;
  }
  if (regform.branch.length == 0) {
    errorMsg("select branch", false);
    return;
  }
  if (regform.email.length == 0) {
    errorMsg("Email is required", false);
    return;
  }
  errorMsg("Successfully submitted", true);
  localStorage.setItem("regform", JSON.stringify(regform));
  setTimeout(() => {
    window.location.href = "navigate.html";
  }, 2000);
}
function errorMsg(msgs, flag) {
  msg.textContent = msgs;
  if (flag) {
    setTimeout(() => {
      msg.textContent = "Loading...";
    }, 1000);
  } else {
    setTimeout(() => {
      msg.textContent = "";
    }, 1000);
  }
}
form.addEventListener("submit", handleSubmit);
