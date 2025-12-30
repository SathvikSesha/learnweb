const fan = document.querySelector(".fan");
const btns = document.querySelector(".btns");
const warn = document.querySelector(".Warning");

let on = false;
let speed = 1;

btns.addEventListener("click", (e) => {
  const id = e.target.id;

  if (!id) return;

  if ((id === "inc" || id === "dec") && !on) {
    showWarning("Turn ON the fan first!");
    return;
  }

  if (id === "on" && !on) {
    fan.classList.add("spin");
    fan.style.animationDuration = speed + "s";
    on = true;
    clearWarning();
  }

  if (id === "off" && on) {
    fan.classList.remove("spin");
    on = false;
    clearWarning();
  }

  if (id === "inc" && on) {
    if (speed > 0.3) {
      speed -= 0.2;
      fan.style.animationDuration = speed + "s";
      clearWarning();
    } else {
      showWarning("Max Speed reached!!");
    }
  }

  if (id === "dec" && on) {
    if (speed < 2) {
      speed += 0.2;
      fan.style.animationDuration = speed + "s";
      clearWarning();
    } else {
      showWarning("Min Speed reached!!");
    }
  }
});

function showWarning(msg) {
  warn.innerHTML = "";

  warn.textContent = msg;

  const blastBtn = document.createElement("button");
  blastBtn.textContent = "💥 Blast Fan";
  blastBtn.classList.add("btn");

  warn.appendChild(document.createElement("br"));
  warn.appendChild(blastBtn);

  blastBtn.addEventListener("click", () => {
    setButtonsDisabled(true);

    fan.classList.remove("spin");
    fan.classList.add("shake");

    setTimeout(() => {
      fan.classList.remove("shake");
      fan.classList.add("blast");
    }, 900);

    setTimeout(() => {
      location.reload();
    }, 1600);
  });
}

function clearWarning() {
  warn.textContent = "";
}

function setButtonsDisabled(state) {
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.disabled = state;
  });
}
