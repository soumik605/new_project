window.onload = function () {
  posts();
};

let container = document.getElementById("container");

async function posts() {
  let users = [];
  await fetch("https://dummyjson.com/posts")
    .then((response) => response.json())
    .then((json) => (users = json.posts));

  users.forEach((user) => {
    let userDiv = document.createElement("div");
    userDiv.classList.add("userDiv");
    container.appendChild(userDiv);

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
  });
}
