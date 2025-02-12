window.onload = function () {
  let container = document.getElementById("container");
  let load = document.createElement("div");
  load.classList.add("load");
  container.appendChild(load);
  posts();
};

async function posts() {
  let users = [];
  await fetch("https://dummyjson.com/posts")
    .then((response) => response.json())
    .then((json) => (users = json.posts));
    container.innerHTML = "";
  users.forEach(async (user,idx) => {    

    let postsData = [];


    let exportButton = document.createElement("button");
    exportButton.id="exportButton"
    exportButton.innerText = "Export to CSV";
    container.appendChild(exportButton);
    exportButton.addEventListener("click", () => {
      exportToCSV(postsData);
    });


  users.forEach(async (user) => {

    let userDiv = document.createElement("div");
    userDiv.id=  `user_index-${idx}`
    userDiv.classList.add("userDiv");
    container.appendChild(userDiv);

    userDiv.addEventListener("click", () => {
      userDiv.classList.add("overlay");
      let close_btn = document.createElement("div");
      close_btn.classList.add("close_btn");
      close_btn.innerText = `close`;
      userDiv.appendChild(close_btn);

      close_btn.addEventListener("click", (e) => {
        e.stopPropagation(); 
        userDiv.classList.remove("overlay");
        close_btn.remove(); 
      });
    });

    

    let userName = await infos(user.id);

    let title = user.title;
    let body = user.body;
    let tags = user.tags;
    let likes = user.reactions.likes;
    let dislikes = user.reactions.dislikes;

    let titleDiv = document.createElement("div");
    titleDiv.classList.add("titlediv");
    userDiv.appendChild(titleDiv);
    titleDiv.innerText = `Title: ${title}`;

    let bodyDiv = document.createElement("div");
    bodyDiv.classList.add("bodydiv");
    userDiv.appendChild(bodyDiv);
    bodyDiv.innerText = ` ${body}`;
    const words = bodyDiv.innerText.split(" ");
    const first20Words = words.slice(0, 20).join(" ");

    bodyDiv.innerText = first20Words + "...";

    let namediv = document.createElement("div");
    namediv.classList.add("namediv");
    namediv.innerText = `${userName}`;
    userDiv.appendChild(namediv);

    let reaction = document.createElement("div");
    reaction.classList.add("reaction");
    userDiv.appendChild(reaction);

    let likesDiv = document.createElement("div");
    likesDiv.classList.add("likesdiv");
    reaction.appendChild(likesDiv);
    likesDiv.innerText = `Likes:${likes}`;

    let dislikesDiv = document.createElement("div");
    dislikesDiv.classList.add("dislikesdiv");
    reaction.appendChild(dislikesDiv);
    dislikesDiv.innerText = `dislikes:${dislikes}`;

    let tagsDiv = document.createElement("div");
    tagsDiv.classList.add("tagsdiv");
    userDiv.appendChild(tagsDiv);
    tagsDiv.innerText = `tags:${tags}`;

    postsData.push({
      title: title,
      userName: userName,
      bodyPreview: first20Words + "...",
      likes: likes,
      dislikes: dislikes,
      tags: tags.join(", "),
    });
  });
  let loadButton = document.createElement("button")
  loadButton.textContent="Load more..."
  loadButton.classList.add("loadButton")
  container.appendChild(loadButton)

  for (let i = 0; i < 10; i++) {
    let userr = document.getElementById(`user_index-${i}`)
    userr.style.display = "block";
  }
  let user_index = 10
  loadButton.addEventListener("click", () => {
    for (let i = user_index; i < `${user_index+10}`; i++) {
      let userr = document.getElementById(`user_index-${i}`)
      if (userr) {
        userr.style.display = "block";
      }
    }
    user_index+=10
    let userr = document.getElementById("user_index-11")
    userr.style.display = "block";
  })
}



  // let exportButton = document.createElement("button");
  // exportButton.innerText = "Export to CSV";
  // container.appendChild(exportButton);
  // exportButton.addEventListener("click", () => {
  //   exportToCSV(postsData);
  // });

}






async function infos(user_id) {
  let user_info = [];
  await fetch(`https://dummyjson.com/users/${user_id}`)
    .then((response) => response.json())
    .then((json) => (user_info = json));

  let firstName = user_info.firstName;
  let lastName = user_info.lastName;
  console.log(user_info);
  console.log(firstName);

  return `${firstName} ${lastName}`;
}

//function for export data to xl sheed
function exportToCSV(data) {

  const csvHeaders = ["Title", "User Name", "Body", "Likes", "Dislikes", "Tags"];
  const csvRows = data.map(item => {
    return `${item.title},${item.userName},${item.bodyPreview},${item.likes},${item.dislikes},${item.tags}`;
  });

 
  const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");

  
  const blob = new Blob([csvContent], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "posts_data.csv";
  link.click();
}
