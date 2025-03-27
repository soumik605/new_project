// Check if the user is logged in
let isLogin = localStorage.getItem("is_Login") || "no";
if (isLogin === "no") {
  window.location.href = "login.html";
}

// Get DOM elements
const back = document.getElementById("back");
const sidebarType = document.getElementById("sidebar_type");
const setoptionDiv = document.getElementById("setoptionDiv");
const changethemebtn = document.getElementById("changethemebtn");
const logout = document.getElementById("logout");
const userprofile = document.getElementById("userprofile");
const profile = document.getElementById("profile");

// Retrieve user details from localStorage
let userEmail = localStorage.getItem("em") || "[]";
let emArray = JSON.parse(userEmail);
let fromLogin = localStorage.getItem("fromlogin") || "no";
let loginEmail = localStorage.getItem("loginEmail"); // Currently logged-in user
let idx = emArray.indexOf(loginEmail);

let lastEmail, loginTime, phoneNo, lastFullName;
let regPhoneList = JSON.parse(localStorage.getItem("reg_ph_lis")) || [];
let fullNameList = JSON.parse(localStorage.getItem("full_name_lis")) || [];
let profileImages = JSON.parse(localStorage.getItem("profileImages")) || {}; // Store per user

// If user exists, fetch details
if (fromLogin === "no") {
  lastEmail = emArray[emArray.length - 1] || "N/A";
  phoneNo = regPhoneList[regPhoneList.length - 1] || "N/A";
  lastFullName = fullNameList[fullNameList.length - 1] || "N/A";
} else {
  lastEmail = loginEmail || "N/A";
  phoneNo = regPhoneList[idx] || "N/A";
  lastFullName = fullNameList[idx] || "N/A";
}

// Retrieve the profile image for the logged-in user
let profilePic = profileImages[loginEmail] || "https://img.freepik.com/premium-vector/social-media-logo_1305298-29989.jpg";
loginTime = localStorage.getItem("loginTime") || "Unknown";

// Add profile details in HTML
profile.innerHTML = `
  <div class="proInfo">
    <div class="pro_imge">
      <img id="pro_imge_id" src="${profilePic}" alt="Profile Image">
    </div>
    <input type="file" id="uploadProfilePic" accept="image/*" style="display: none;">
    <div class="exinfo">
      <p><strong>User Name:</strong> ${lastFullName}</p>
      <p><strong>Email:</strong> ${lastEmail}</p>
      <p><strong>Last Login:</strong> ${loginTime}</p>
      <p><strong>Phone No:</strong> ${phoneNo}</p>
    </div>
    <button id="setProfilePic">Set Profile Picture</button>
    <button id="removeProfilePic">Remove Profile Picture</button>
  </div>
`;

// Get elements
const profileImageElement = document.getElementById("pro_imge_id");
const setProfilePicBtn = document.getElementById("setProfilePic");
const removeProfilePicBtn = document.getElementById("removeProfilePic");
const uploadProfilePic = document.getElementById("uploadProfilePic");

// Open file selector when clicking "Set Profile Picture"
setProfilePicBtn.addEventListener("click", () => {
  uploadProfilePic.click();
});

// Handle file selection and set profile picture
uploadProfilePic.addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageUrl = e.target.result;
      profileImageElement.src = imageUrl;

      // Store the profile image per user
      profileImages[loginEmail] = imageUrl;
      localStorage.setItem("profileImages", JSON.stringify(profileImages));
    };
    reader.readAsDataURL(file);
  }
});

// Remove profile picture
removeProfilePicBtn.addEventListener("click", () => {
  profileImageElement.src = "https://img.freepik.com/premium-vector/social-media-logo_1305298-29989.jpg";

  // Remove the profile picture from localStorage
  delete profileImages[loginEmail];
  localStorage.setItem("profileImages", JSON.stringify(profileImages));
});

// Toggle profile section
userprofile.onclick = () => {
  profile.classList.toggle("hide");
};

// Back button navigation
back.onclick = () => {
  location.href = "users.html";
};

// Theme change functionality
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
  }
};

// Set theme on page load
window.onload = function () {
  if (localStorage.getItem("light") === "enabled") {
    document.body.classList.add("dark-mode");
    setoptionDiv.classList.add("inner_dark_mode");
    changethemebtn.innerText = "light";
  } else {
    changethemebtn.innerText = "dark";
  }
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
// Logout button click event
logout.onclick = autoLogout;

// Sidebar type selection
sidebar_type.addEventListener("change", function () {
  localStorage.setItem("sidebartype", sidebar_type.value);
});


