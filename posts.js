// window onload function
window.onload = function () {
  let maincont = document.getElementById("maincont");

  posts();
};

let currentPage = 1;
const limit = 10;
let postsData = [];

async function posts() {
  let maincont = document.getElementById("maincont");
  let users = [];

  //modal / overlay
  let overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.classList.add("hide");
  let modal = document.createElement("div");
  modal.id = "modal";
  modal.classList.add("hide");
  let closeBtn = document.createElement("button");
  closeBtn.id = "closeBtn";
  closeBtn.innerHTML = `X`;
  modal.appendChild(closeBtn);


  let exportButton = document.createElement("button");
  exportButton.id = "exportButton";
  exportButton.innerText = "Export to CSV";
  maincont.appendChild(exportButton);

  exportButton.addEventListener("click", () => {
    exportToCSV(postsData);
  });
  let container = document.createElement("div");
  container.id = "container";

  await fetch("https://dummyjson.com/posts")
    .then((response) => response.json())
    .then((json) => (users = json.posts));
  maincont.innerHTML = "";
  maincont.appendChild(exportButton);
  maincont.appendChild(modal);
  maincont.appendChild(overlay);
  maincont.appendChild(container);




  users.forEach(async (user, idx) => {
    let mainUserdiv = document.createElement("div");
    mainUserdiv.classList.add("mainUserdiv");
    container.appendChild(mainUserdiv);
    let userDiv = document.createElement("div");
    userDiv.classList.add("userDiv");
    mainUserdiv.appendChild(userDiv);

   

    let userName = await infos(user.id);
    let title = user.title;
    let body = user.body;
    let tags = user.tags;
    let likes = user.reactions.likes;
    let dislikes = user.reactions.dislikes;

    userDiv.addEventListener("click", openModal);
    overlay.addEventListener("click", closeModal);
    closeBtn.addEventListener("click", closeModal);
   

    let titleDiv = document.createElement("div");
    titleDiv.classList.add("titlediv");
    titleDiv.innerText = `Title: ${title}`;
    userDiv.appendChild(titleDiv);

    let bodyDiv = document.createElement("div");
    bodyDiv.classList.add("bodydiv");
    const words = body.split(" ");
    const first20Words = words.slice(0, 20).join(" ");
    bodyDiv.innerText = first20Words + "...";
    userDiv.appendChild(bodyDiv);

    let reaction = document.createElement("div");
    reaction.classList.add("reaction");
    userDiv.appendChild(reaction);

    let likesDiv = document.createElement("div");
    likesDiv.classList.add("likesdiv");
    likesDiv.innerText = `Likes: ${likes}`;
    reaction.appendChild(likesDiv);
    likesDiv.innerText = `Likes: ${likes}`;

    let dislikesDiv = document.createElement("div");
    dislikesDiv.classList.add("dislikesdiv");
    dislikesDiv.innerText = `Dislikes: ${dislikes}`;
    reaction.appendChild(dislikesDiv);
    dislikesDiv.innerText = `dislikes: ${dislikes}`;

    let tagsDiv = document.createElement("div");
    tagsDiv.classList.add("tagsdiv");
    tagsDiv.innerText = `Tags: ${tags.join(", ")}`;
    userDiv.appendChild(tagsDiv);

    postsData.push({
      title: title,
      userName: userName,
      bodyPreview: first20Words + "...",
      likes: likes,
      dislikes: dislikes,
      tags: tags.join(", "),
    });
  });

}

//user data from user id
async function infos(user_id) {
  let user_info = await fetch(`https://dummyjson.com/users/${user_id}`).then(
    (response) => response.json()
  );

  return {
    fullname: `${user_info.firstName} ${user_info.lastName}`,
    email: user_info.email,
    username: user_info.username,
    gender: user_info.gender,
    role: user_info.role,
  };
}

//csv data download
function exportToCSV(data) {
  const csvHeaders = [
    "Title",
    "User Name",
    "Body Preview",
    "Likes",
    "Dislikes",
    "Tags",
  ];
  const csvRows = data.map((item) => {
    return `"${item.title}","${item.userName}","${item.bodyPreview}","${item.likes}","${item.dislikes}","${item.tags}"`;
  });

  const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "posts_data.csv";
  link.click();
}
//modal portion
const openModal = function () {
  modal.classList.remove("hide");
  overlay.classList.remove("hide");
};

const closeModal = function () {
  modal.classList.add("hide");
  overlay.classList.add("hide");
};

//dark mode
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
}
// show more user function
let user_index = 0;
function showMoreUsers() {
  for (let i = user_index; i < user_index + 10 && i < users.length; i++) {
    let userr = document.getElementById(`user_index-${i}`);
    if (userr) {
      userr.style.display = "block";
    }
  }
  user_index += 10;
  if (user_index === users.length) {
    loadButton.style.display = "none";
  }
}