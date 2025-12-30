const input = document.querySelector(".in");
const btn = document.querySelector(".btn");
const clear = document.querySelector(".clc");
const list = document.querySelector(".list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

btn.addEventListener("click", (e) => {
  e.preventDefault();

  const task = input.value.trim();
  if (!task) return;

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";

  display();
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});

clear.addEventListener("click", () => {
  tasks = [];
  localStorage.removeItem("tasks");
  display();
});

function display() {
  list.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task;
    list.appendChild(li);
  });
}

display();
