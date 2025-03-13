// window onload function
window.onload = function () {
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
  }
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

  let commentbox = document.createElement("div");
  commentbox.id = "commentbox";
  modal.appendChild(commentbox);

  let exportButton = document.createElement("button");
  exportButton.id = "exportButton";
  exportButton.innerText = "Export to CSV";
  exportButton.addEventListener("click", () => exportToCSV(postsData));

  let container = document.createElement("div");
  container.id = "container";

  let response = await fetch(
    `https://dummyjson.com/posts?limit=${limit}&skip=${
      (currentPage - 1) * limit
    }`
  );
  let json = await response.json();
  users = json.posts;

  // Hide loading animation
  maincont.innerHTML = "";
  maincont.appendChild(exportButton);
  let searchUser = document.createElement("div");
  searchUser.classList.add("searchUser");

  let searchIcon = document.createElement("div");
  searchIcon.classList.add("searchIcon");
  searchIcon.innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-6'>
                                  <path strokeLinecap='round' strokeLinejoin='round' d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z' />
                                </svg>`;

  let searchInput = document.createElement("input");
  searchInput.placeholder = "Search User";
  searchInput.spellcheck = false;
  searchInput.classList.add("searchInput");

  searchUser.appendChild(searchIcon);
  searchUser.appendChild(searchInput);
  maincont.appendChild(searchUser);
  searchInput.addEventListener("input", search);

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
  postsData = [];

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

    userDiv.addEventListener("click", async () => {
      openModal();
      let comments = await ShowPostComment(user.id);
      document.getElementById("commentbox").innerHTML = comments;
    });
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

    let name_div = document.createElement("div");
    name_div.classList.add("name_div");
    name_div.innerText = userName;
    userDiv.appendChild(name_div);

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
  let response = await fetch(`https://dummyjson.com/users/${user_id}`);
  let user_info = await response.json();
  return `${user_info.firstName} ${user_info.lastName}`;
}

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
  let response = await fetch(
    `https://dummyjson.com/posts?limit=${limit}&skip=${
      (currentPage - 1) * limit
    }`
  );
  let json = await response.json();
  displayPosts(json.posts);
}

async function ShowPostComment(postId) {
  commentbox.innerText = "comment getting...";
  let load = document.createElement("div");
  commentbox.innerText=""
  load.classList.add("load");
  commentbox.appendChild(load);
  load.id="load2"
  let response = await fetch(`https://dummyjson.com/posts/${postId}/comments`);
  load.classList.remove("load");
  let data = await response.json();

  return data.comments
    .map(
      (comment) =>
        `<p><b><i class="fa-regular fa-user"></i> ${comment.user.username}</b><br><i class="fa-regular fa-comment"></i> ${comment.body}  </p><br>`
    )
    .join("");
}

const search = () => {
  const searchbox = document.querySelector(".searchInput").value.toUpperCase();
  const allUserDiv = document.querySelectorAll(".mainUserdiv");
  const uname = document.querySelectorAll(".name_div");

  for (let i = 0; i < uname.length; i++) {
    let match = allUserDiv[i].querySelector(".name_div");
    if (match) {
      let textvalue = match.textContent || match.innerHTML;
      if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
        allUserDiv[i].style.display = "";
      } else {
        allUserDiv[i].style.display = "none";
      }
    }
  }
};


let buttonTop = document.createElement("div");

buttonTop.classList.add("top-button");

buttonTop.innerHTML = "⬆️";

document.body.appendChild(buttonTop);

window.onscroll = () => {
    if (document.documentElement.scrollTop > 1 || document.body.scrollTop > 1) {
        buttonTop.style.visibility = "visible";
    } else {
        buttonTop.style.visibility = "hidden";
    }
}

buttonTop.onclick = () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}


