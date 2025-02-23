let back = document.getElementById("back");
let sidebar_type = document.getElementById("sidebar_type");

let changethemebtn = document.getElementById("changethemebtn");
let setoptionDiv = document.getElementById("setoptionDiv");

back.onclick = function () {
  location.href = "sidebar.html";
};

changethemebtn.onclick = function () {
  document.body.classList.toggle("dark-mode");
  setoptionDiv.classList.toggle("inner_dark_mode");

  if (document.body.classList.contains("dark-mode")) {
    changethemebtn.innerText = "light";
    localStorage.setItem("darkMode", "enabled");
  } else {
    changethemebtn.innerText = "dark";
    localStorage.setItem("darkMode", "disabled");
  }
};

window.onload = function () {
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    setoptionDiv.classList.add("inner_dark_mode");
    changethemebtn.innerText = "light";
  } else {
    changethemebtn.innerText = "dark";
  }
};
