class Task {
  static nextId = 1;

  constructor(title, category, priority, completed = false) {
    this.id = Task.nextId++;
    this.title = title;
    this.category = category;
    this.priority = priority;
    this.completed = Boolean(completed);
  }
}

const tasks = [];
let currentFilter = "all";
let searchQuery = "";

const el = {
  form: document.getElementById("task-form"),
  title: document.getElementById("title"),
  category: document.getElementById("category"),
  priority: document.getElementById("priority"),
  tasksList: document.getElementById("tasks"),
  emptyMsg: document.getElementById("empty-msg"),
  statTotal: document.getElementById("stat-total"),
  statCompleted: document.getElementById("stat-completed"),
  statPending: document.getElementById("stat-pending"),
  searchInput: document.getElementById("tasksearch"),
  filterAll: document.getElementById("filter-all"),
  filterActive: document.getElementById("filter-active"),
  filterCompleted: document.getElementById("filter-completed"),
  searchBtn: document.getElementById("search-btn"),
};

function getTaskStats(taskList) {
  return taskList.reduce(
    (acc, { completed }) => ({
      total: acc.total + 1,
      completed: acc.completed + (completed ? 1 : 0),
      pending: acc.pending + (completed ? 0 : 1),
    }),
    { total: 0, completed: 0, pending: 0 },
  );
}

function updateStats() {
  const { total, completed, pending } = getTaskStats(tasks);
  el.statTotal.textContent = String(total);
  el.statCompleted.textContent = String(completed);
  el.statPending.textContent = String(pending);
}

function filterByStatus(taskList, filter) {
  if (filter === "active") {
    return taskList.filter(({ completed }) => !completed);
  }
  if (filter === "completed") {
    return taskList.filter(({ completed }) => completed);
  }
  return taskList.filter(() => true);
}

function findMatchingTasks(taskList, query) {
  const q = query.trim().toLowerCase();
  if (!q) return taskList;

  const pool = [...taskList];
  const found = [];

  while (pool.length) {
    const match = pool.find(({ title, category }) => {
      return (
        title.toLowerCase().includes(q) || category.toLowerCase().includes(q)
      );
    });
    if (!match) break;
    found.push(match);
    const { id } = match;
    const idx = pool.findIndex((t) => t.id === id);
    pool.splice(idx, 1);
  }

  return found;
}

function getVisibleTasks() {
  const afterFilter = filterByStatus(tasks, currentFilter);
  return findMatchingTasks(afterFilter, searchQuery);
}

function priorityClass(priority) {
  if (priority === "high") return "priority-high";
  if (priority === "medium") return "priority-medium";
  return "priority-low";
}

function renderTasks() {
  const visible = getVisibleTasks();

  el.tasksList.innerHTML = visible
    .map(
      ({ id, title, category, priority, completed }) => `
      <li class="task-item${completed ? " completed" : ""}" data-id="${id}">
        <div class="task-body">
          <div class="task-title">${escapeHtml(title)}</div>
          <div class="task-meta">
            <span>${escapeHtml(category)}</span>
            ·
            <span class="${priorityClass(priority)}">${escapeHtml(priority)}</span>
          </div>
        </div>
        <div class="task-actions">
          <input type="checkbox" ${completed ? "checked" : ""} aria-label="Toggle complete" data-toggle="${id}">
          <button type="button" class="delete" data-delete="${id}">Delete</button>
        </div>
      </li>
    `,
    )
    .join("");

  const showEmpty = visible.length === 0;
  el.emptyMsg.hidden = !showEmpty;
  el.emptyMsg.textContent =
    tasks.length === 0
      ? "No tasks yet. Add one above."
      : "No tasks match your filter or search.";
  el.tasksList.style.display = showEmpty ? "none" : "";
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function setFilter(filter) {
  currentFilter = filter;
  [el.filterAll, el.filterActive, el.filterCompleted].forEach((btn) => {
    btn.classList.toggle("active", btn.id === `filter-${filter}`);
  });
  renderTasks();
}

el.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = el.title.value.trim();
  const category = el.category.value.trim();
  const priority = el.priority.value;

  if (!title || !category || !priority) return;

  tasks.push(new Task(title, category, priority, false));
  el.form.reset();
  updateStats();
  renderTasks();
});

el.filterAll.addEventListener("click", () => setFilter("all"));
el.filterActive.addEventListener("click", () => setFilter("active"));
el.filterCompleted.addEventListener("click", () => setFilter("completed"));

function applySearch() {
  searchQuery = el.searchInput.value;
  renderTasks();
}

el.searchBtn.addEventListener("click", applySearch);
el.searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    applySearch();
  }
});

el.tasksList.addEventListener("click", (e) => {
  const del = e.target.closest("[data-delete]");
  if (!del) return;
  const id = Number(del.getAttribute("data-delete"), 10);
  const idx = tasks.findIndex(({ id: taskId }) => taskId === id);
  if (idx !== -1) {
    tasks.splice(idx, 1);
    updateStats();
    renderTasks();
  }
});

el.tasksList.addEventListener("change", (e) => {
  const toggle = e.target.closest('[data-toggle][type="checkbox"]');
  if (!toggle) return;
  const id = Number(toggle.getAttribute("data-toggle"), 10);
  const task = tasks.find(({ id: taskId }) => taskId === id);
  if (task) {
    task.completed = toggle.checked;
    updateStats();
    renderTasks();
  }
});

updateStats();
renderTasks();
