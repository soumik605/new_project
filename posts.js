window.onload = function () {
  posts();
};
let currentPage = 1;
const limit = 10;

async function posts() {
  let maincont = document.getElementById("maincont");
  let container = document.createElement("div");
    let load = document.createElement("div");
  load.classList.add("load");
  container.appendChild(load);
  container.id = "container";
  container.className = "dark-mode";
  
  let exportButton = document.createElement("button");
  exportButton.id = "exportButton";
  exportButton.innerText = "Export to CSV";
  maincont.appendChild(exportButton);
  
  exportButton.addEventListener("click", () => {
    exportToCSV(postsData);
  });

  maincont.appendChild(container);
  
  let loadButton = document.createElement("button");
  loadButton.textContent = "Load more...";
  loadButton.classList.add("loadButton");
  maincont.appendChild(loadButton);
  
  loadButton.addEventListener("click", () => {
    loadMorePosts();
  });
  
  await loadMorePosts();
  container.innerHTML = "";
}

async function loadMorePosts() {
  let container = document.getElementById("container");
  
  let response = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${(currentPage - 1) * limit}`);
  let data = await response.json();
  let users = data.posts;

  if (users.length === 0) {
    document.querySelector(".loadButton").style.display = "none"; 
    return;
  }

  users.forEach(async (user, idx) => {
    let userDiv = document.createElement("div");
    userDiv.id = `user_index-${(currentPage - 1) * limit + idx}`;
    userDiv.classList.add("userDiv");
    
    let userName = await infos(user.id);
    let title = user.title;
    let body = user.body;
    let tags = user.tags;
    let likes = user.reactions.likes;
    let dislikes = user.reactions.dislikes;

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

    let namediv = document.createElement("div");
    namediv.classList.add("namediv");
    namediv.innerText = `${userName}`;
    userDiv.appendChild(namediv);

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

    container.appendChild(userDiv);
  });

  currentPage++; 
}


async function infos(user_id) {
  let user_info = await fetch(`https://dummyjson.com/users/${user_id}`)
    .then((response) => response.json());
  return `${user_info.firstName} ${user_info.lastName}`;
}

function exportToCSV(data) {
  const csvHeaders = ["Title", "User Name", "Body", "Likes", "Dislikes", "Tags"];
  const csvRows = data.map(item => {
    return `"${item.title}","${item.userName}","${item.bodyPreview}","${item.likes}","${item.dislikes}","${item.tags}"`;
  });

  const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "posts_data.csv";
  link.click();
}
