window.onload = function () {
  // let container = document.getElementById("container");
  let maincont = document.getElementById("maincont");
  let load = document.createElement("div");
  load.classList.add("load");
  maincont.appendChild(load);
  posts();
};

async function posts() {
  let maincont = document.getElementById("maincont");
  let users = [];
  let exportButton = document.createElement("button");
  exportButton.id = "exportButton";
  exportButton.innerText = "Export to CSV";

  let overlay= document.createElement("div")
  overlay.id="overlay"
  overlay.classList.add("hide")
  let modal = document.createElement("div");
  modal.id="modal"
  modal.classList.add("hide")
  let closeBtn= document.createElement("button")
  closeBtn.id="closeBtn"
  modal.appendChild(closeBtn)
  closeBtn.innerHTML=`X`

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

    let postsData = [];

    




    users.forEach(async (user, idx) => {
      let mainUserdiv = document.createElement("div");
      mainUserdiv.classList.add("mainUserdiv");
      container.appendChild(mainUserdiv);
      let userDiv = document.createElement("div");
      userDiv.id = `user_index-${idx}`;
      userDiv.classList.add("userDiv");
      mainUserdiv.appendChild(userDiv);
     

      let userName = await infos(user.id);
      let title = user.title;
      let body = user.body;
      let tags = user.tags;
      let likes = user.reactions.likes;
      let dislikes = user.reactions.dislikes;

      userDiv.addEventListener("click", openModal, container.style.cursor="none",);
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
    let loadButton = document.createElement("button");
    loadButton.textContent = "Load more...";
    loadButton.classList.add("loadButton");
    container.appendChild(loadButton);

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

    showMoreUsers();

    loadButton.addEventListener("click", showMoreUsers);
  // });
}

async function infos(user_id) {
  let user_info = await fetch(`https://dummyjson.com/users/${user_id}`).then(
    (response) => response.json()
  );
  return `${user_info.firstName} ${user_info.lastName}`;
}

function exportToCSV(data) {
  const csvHeaders = [
    "Title",
    "User Name",
    "Body",
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

const openModal = function () {
  modal.classList.remove("hide");
  overlay.classList.remove("hide");
};

const closeModal = function () {
  modal.classList.add("hide");
  overlay.classList.add("hide");
};
