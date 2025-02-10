window.onload = function () {
  posts();
};

let container = document.getElementById("container");

async function posts() {
  let users = [];
  await fetch("https://dummyjson.com/posts")
    .then((response) => response.json())
    .then((json) => (users = json.posts));

  users.forEach(async (user) => {
    let userDiv = document.createElement("div");
    userDiv.classList.add("userDiv");
    container.appendChild(userDiv); 

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
  });
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
