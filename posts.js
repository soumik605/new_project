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
    let p = document.createElement("p");
    userDiv.appendChild(p);

    p.innerText = `title: ${user.title}\n
    body: ${user.body}\n
    tags: ${user.tags}\n
    likes: ${user.likes} dislikes: ${user.dislikes}
    `;
  });
}
