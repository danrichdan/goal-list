// Define UI Variables
const form = document.querySelector("#goal-form");
const goalList = document.querySelector(".list-group");
const clearBtn = document.querySelector(".clear-goals");
const filter = document.querySelector("#filter");
const goalInput = document.querySelector("#goal");

// Load all Event Listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load Event
  document.addEventListener("DOMContentLoaded", getGoals);
  // Add Goal event
  form.addEventListener("submit", addGoal);
  // Remove Goal Event
  goalList.addEventListener("click", removeGoal);
  // Clear Goals Event
  clearBtn.addEventListener("click", clearGoals);
  // Filter Goals Event
  filter.addEventListener("keyup", filterGoals);
}

// Get Goals from LS
function getGoals() {
  let goals;
  if (localStorage.getItem("goals") === null) {
    goals = [];
  } else {
    goals = JSON.parse(localStorage.getItem("goals"));
  }

  goals.forEach(function (goal) {
    // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "list-group-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(goal));
    // Create button element
    const button = document.createElement("button");
    // Add class
    button.className = "close";
    // Add attributes
    button.setAttribute("type", "button");
    button.setAttribute("aria-label", "Close");
    // Add close symbol
    button.innerHTML = '<span aria-hidden="true">&times;</span>';
    // Append CLose button to li
    li.appendChild(button);

    // Append li to ul
    goalList.appendChild(li);
  });
}

// Add Goal
function addGoal(e) {
  e.preventDefault();

  if (goalInput.value === "") {
    alert("Add a Goal");
  } else {
    // Create li element
    const li = document.createElement("li");
    // Add class
    li.className = "list-group-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(goalInput.value));
    // Create button element
    const button = document.createElement("button");
    // Add class
    button.className = "close";
    // Add attributes
    button.setAttribute("type", "button");
    button.setAttribute("aria-label", "Close");
    // Add close symbol
    button.innerHTML = '<span aria-hidden="true">&times;</span>';
    // Append CLose button to li
    li.appendChild(button);

    // Append li to ul
    goalList.appendChild(li);

    // Store in LS
    storeGoalInLocalStorage(goalInput.value);

    // Clear the input
    goalInput.value = "";
  }
}

// Store Goal
function storeGoalInLocalStorage(goal) {
  let goals;
  if (localStorage.getItem("goals") === null) {
    goals = [];
  } else {
    goals = JSON.parse(localStorage.getItem("goals"));
  }

  goals.push(goal);

  localStorage.setItem("goals", JSON.stringify(goals));
}

// Remove Goal
function removeGoal(e) {
  if (e.target.parentElement.classList.contains("close")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      // Remove from LS
      removeGoalFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from Storage
function removeGoalFromLocalStorage(goalItem) {
  goalItem = goalItem.textContent;
  goalItem = goalItem.substr(0, goalItem.length - 1);
  let goals;
  if (localStorage.getItem("goals") === null) {
    goals = [];
  } else {
    goals = JSON.parse(localStorage.getItem("goals"));
  }

  goals.forEach(function (goal, index) {
    if (goalItem === goal) {
      goals.splice(index, 1);
    }
  });

  localStorage.setItem("goals", JSON.stringify(goals));
}

// Clear Goals
function clearGoals() {
  while (goalList.firstChild) {
    goalList.removeChild(goalList.firstChild);
  }

  // Clear from LS
  clearGoalsFromLocalStorage();
}

// Clear Storage
function clearGoalsFromLocalStorage() {
  localStorage.clear();
}

// Filter Goals
function filterGoals(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".list-group-item").forEach(function (goal) {
    const item = goal.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      goal.style.display = "block";
    } else {
      goal.style.display = "none";
    }
  });
}
