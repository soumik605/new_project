let back = document.getElementById("back");
let sidebar_type = document.getElementById("sidebar_type");
let setcont = document.getElementsByClassName("setcont");
let changethemebtn = document.getElementById("changethemebtn");
let setoptionDiv = document.getElementById("setoptionDiv");
let logout = document.getElementById("logout");
let userprofile = document.getElementById("userprofile");
let profile = document.getElementById("profile");
let userEmail = localStorage.getItem("em");
let emarray = JSON.parse(userEmail);
let lastem = emarray[0];
let loginTime = localStorage.getItem("loginTimestamp");

back.onclick = function () {
  location.href = "users.html";
};

changethemebtn.onclick = function () {
  document.body.classList.toggle("dark-mode");
  setoptionDiv.classList.toggle("inner_dark_mode");
  localStorage.setItem("darkModeUpdated", Date.now());

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

profile.innerHTML = `
 <div class="proInfo">
              <p><strong>email:</strong> ${lastem}</p>
              <p><strong> Last Login :</strong> ${loginTime}</p>
            </div>
`;

userprofile.onclick = function () {
  profile.classList.toggle("hide");
};

logout.onclick = function () {
  localStorage.removeItem("loginTimestamp");
  localStorage.setItem("logoutTime", new Date().getTime());
  localStorage.setItem("is_Login", "no");
  window.location.href = "login.html";
};
