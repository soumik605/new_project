// window onload function
window.onload = function () {
  let maincont = document.getElementById("maincont");
  let load = document.createElement("div");
  load.classList.add("load");
  maincont.appendChild(load);
  posts();
};

let currentPage = 1;
const limit = 10;
let postsData = [];
let users = [];

async function posts() {
  let maincont = document.getElementById("maincont");
  maincont.innerHTML = "";

  // Show loading animation
  let load = document.createElement("div");
  load.classList.add("load");
  maincont.appendChild(load);

  // Modal / Overlay
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
  exportButton.addEventListener("click", () => exportToCSV(postsData));

  let container = document.createElement("div");
  container.id = "container";

  await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${(currentPage - 1) * limit}`)
    .then((response) => response.json())
    .then((json) => (users = json.posts));

  // Hide loading animation
  maincont.innerHTML = "";
  maincont.appendChild(exportButton);
  maincont.appendChild(modal);
  maincont.appendChild(overlay);
  maincont.appendChild(container);

  let loadButton = document.createElement("button");
  loadButton.textContent = "Load more...";
  loadButton.classList.add("loadButton");
  loadButton.addEventListener("click", loadMorePosts);
  maincont.appendChild(loadButton);

  displayPosts(users);
}

function displayPosts(postsArray) {
  let container = document.getElementById("container");
  postsArray.forEach(async (user) => {
    let mainUserdiv = document.createElement("div");
    mainUserdiv.classList.add("mainUserdiv");
    container.appendChild(mainUserdiv);

    let userDiv = document.createElement("div");
    userDiv.classList.add("userDiv");
    mainUserdiv.appendChild(userDiv);

    let userName = await infos(user.userId);
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
    bodyDiv.innerText = body.split(" ").slice(0, 20).join(" ") + "...";
    userDiv.appendChild(bodyDiv);

    let reaction = document.createElement("div");
    reaction.classList.add("reaction");
    userDiv.appendChild(reaction);

    let likesDiv = document.createElement("div");
    likesDiv.classList.add("likesdiv");
    likesDiv.innerText = `Likes: ${likes}`;
    reaction.appendChild(likesDiv);

    let dislikesDiv = document.createElement("div");
    dislikesDiv.classList.add("dislikesdiv");
    dislikesDiv.innerText = `Dislikes: ${dislikes}`;
    reaction.appendChild(dislikesDiv);

    let tagsDiv = document.createElement("div");
    tagsDiv.classList.add("tagsdiv");
    tagsDiv.innerText = `Tags: ${tags.join(", ")}`;
    userDiv.appendChild(tagsDiv);

    postsData.push({
      title,
      userName,
      bodyPreview: body.split(" ").slice(0, 20).join(" ") + "...",
      likes,
      dislikes,
      tags: tags.join(", "),
    });
  });
}

async function infos(user_id) {
  let user_info = await fetch(`https://dummyjson.com/users/${user_id}`).then((response) => response.json());
  return `${user_info.firstName} ${user_info.lastName}`;
}

function exportToCSV(data) {
  const csvHeaders = ["Title", "User Name", "Body Preview", "Likes", "Dislikes", "Tags"];
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

const openModal = () => {
  document.getElementById("modal").classList.remove("hide");
  document.getElementById("overlay").classList.remove("hide");
};

const closeModal = () => {
  document.getElementById("modal").classList.add("hide");
  document.getElementById("overlay").classList.add("hide");
};

async function loadMorePosts() {
  currentPage++;
  let morePosts = [];
  await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${(currentPage - 1) * limit}`)
    .then((response) => response.json())
    .then((json) => (morePosts = json.posts));
  displayPosts(morePosts);
}
