const btn = document.querySelector(".btn");
const input = document.querySelector("#in");
const list = document.querySelector(".lists");
const empty = document.querySelector(".empty");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function render() {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;
    li.classList.add("task-item");
    li.dataset.index = index;
    list.appendChild(li);
  });
}

function toggleEmptyState() {
  empty.style.display = tasks.length === 0 ? "block" : "none";
}

btn.addEventListener("click", (e) => {
  e.preventDefault();

  const task = input.value.trim();
  if (!task) return;

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  render();
  toggleEmptyState();
  input.value = "";
});

list.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("done");
  }
});

list.addEventListener("dblclick", (e) => {
  if (e.target.tagName === "LI") {
    const index = e.target.dataset.index;
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    render();
    toggleEmptyState();
  }
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") btn.click();
});

render();
toggleEmptyState();
