is_Login = localStorage.getItem("is_Login")||"no"
if (is_Login=="no") {
  window.location.href = "login.html"
}
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
let fromlogin = localStorage.getItem("fromlogin")||"no";
let loginEmail = localStorage.getItem("loginEmail");
let userlist = JSON.parse(localStorage.getItem("userList"))||[];
let idx = 0;
userlist.forEach(user => {
  if (user.email===loginEmail) {
    idx = user.id
  }
});

let lastem, loginTime, phoneNO, lastfullName, pro_pic;
if (fromlogin==="no") {
  lastem = userlist.at(-1);
  loginTime = localStorage.getItem("loginTime");
  let reg_ph_lis = localStorage.getItem("reg_ph_lis");
  let pharrey = JSON.parse(reg_ph_lis);
  phoneNO = userlist.at(-1).phone;
  // let full_name_lis = localStorage.getItem("full_name_lis");
  // let namearrey = JSON.parse(full_name_lis);
  lastfullName =  userlist.at(-1).fulname;
  pro_pic = localStorage.getItem("profileImage") || [];
}
else{
  lastem = userlist.at(idx);
  // console.log(lastem);
  loginTime = localStorage.getItem("loginTime");
  let reg_ph_lis = localStorage.getItem("reg_ph_lis");
  let pharrey = JSON.parse(reg_ph_lis);
  phoneNO = userlist.at(idx).phone;
  
  // let full_name_lis = localStorage.getItem("full_name_lis");
  // let namearrey = JSON.parse(full_name_lis);
  lastfullName =  userlist.at(idx).fulname;
  // let profileImages = JSON.parse(localStorage.getItem("profileImages")) || [];
  console.log(userlist);
  localStorage.setItem("profileImage",userlist.at(idx).Image)
  // console.log(userlist.at(idx).Image);
  pro_pic = localStorage.getItem("profileImage") || [];
}

if (!pro_pic || pro_pic == "no img") {
  console.log('pic nahi ha koi')
  pro_pic = "https://img.freepik.com/premium-vector/social-media-logo_1305298-29989.jpg";
}
// console.log(lastfullName);

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
console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");

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
  let sidebarvalue = localStorage.getItem("sidebartype");
  sidebar_type.value=sidebarvalue;
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    setoptionDiv.classList.add("inner_dark_mode");
    changethemebtn.innerText = "light";
  } else {
    changethemebtn.innerText = "dark";
  }
};

console.log(lastem);
profile.innerHTML = `
 <div class="proInfo">
       <div class="pro_imge"><img id="pro_imge_id" src="${pro_pic}"></div>
              <div class="exinfo">
              <p><strong>User Name:</strong> ${lastfullName}</p>
              <p><strong>email:</strong> ${lastem.email}</p>
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
// Logout button click event
logout.onclick = autoLogout;

// Sidebar type selection
sidebar_type.addEventListener("change", function () {
  localStorage.setItem("sidebartype", sidebar_type.value);
});


