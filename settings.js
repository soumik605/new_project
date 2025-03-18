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
let lastem = emarray[emarray.length - 1];
let loginTime = localStorage.getItem("loginTime");
let reg_ph_lis = localStorage.getItem("reg_ph_lis");
let pharrey = JSON.parse(reg_ph_lis);
let phoneNO = pharrey[pharrey.length - 1];
let full_name_lis = localStorage.getItem("full_name_lis");
let namearrey = JSON.parse(full_name_lis);
let lastfullName = namearrey[namearrey.length - 1];
let pro_pic = JSON.parse(localStorage.getItem("pro_imges") || '""');
if (!pro_pic || pro_pic == "null") {
  console.log('pic nahi ha koi')
  pro_pic = "https://img.freepik.com/premium-vector/social-media-logo_1305298-29989.jpg";
}

back.onclick = function () {
  location.href = "users.html";
};

changethemebtn.onclick = function () {
  document.body.classList.toggle("dark-mode");
  profile.classList.toggle("inner_dark_mode");
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
       <div class="pro_imge"><img src="${pro_pic}"></div>
              <div class="exinfo">
              <p><strong>User Name:</strong> ${lastfullName}</p>
              <p><strong>email:</strong> ${lastem}</p>
              <p><strong> Last Login :</strong> ${loginTime}</p>
              <p><strong> Phone No:</strong> ${phoneNO}</p>
              </div>
  </div>
`;

userprofile.onclick = function () {
  profile.classList.toggle("hide");
};

function checkAutoLogout() {
  let loginTime = localStorage.getItem("loginTimestamp");
  if (!loginTime) return;

  let currentTime = Date.now();
  let sixHours = 6 * 60 * 60 * 1000;

  if (currentTime - loginTime >= sixHours) {
    alert("Session expired. Logging out automatically.");
    autoLogout();
  }
}

function autoLogout() {
  localStorage.removeItem("loginTimestamp");
  localStorage.setItem("is_Login", "no");
  localStorage.setItem("logoutTime", new Date().toLocaleString());
  window.location.href = "login.html";
}

checkAutoLogout();

setInterval(checkAutoLogout, 1 * 60 * 1000);

logout.onclick = function () {
  autoLogout();
};

