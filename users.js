window.onload = function () {
  let container = document.getElementById("container");
  let load = document.createElement("div");
  load.classList.add("load");
  container.appendChild(load);
  fetch("https://dummyjson.com/users")
    .then(function (call) {
      return call.json();
    })
    .then(function (object) {
      container.innerHTML = "";
      let userlist = object.users;
      let a = 0;
      let usersData = [];

      let searchUser  = document.createElement("div")
      let searchInput = document.createElement("input")



      

      let exportButton = document.createElement("button");
      exportButton.id="exportButton"
      exportButton.innerText = "Export to CSV";
      container.appendChild(exportButton);
      exportButton.addEventListener("click", () => {
        exportToCSV(usersData);
      });

      for (let a = 0; a < userlist.length; a++) {
        let fullname = `${userlist[a].firstName} ${userlist[a].maidenName} ${userlist[a].lastName}`;
        let age = userlist[a].age;
        let gender = userlist[a].gender;
        let email = userlist[a].email;
        let username = userlist[a].username;
        let image = userlist[a].image;
        let role = userlist[a].role;
        let userdata = document.createElement("div");
        userdata.classList.add("userdata");

        userdata.innerHTML = `
                    <h2>${fullname}</h2> </br>
                    <hr id = "hr">
                    <pre><b>Age</b>: ${age}<t>              <b>Gender</b>: ${gender}</br></pre>
                    <b>Email</b>: ${email}</br></br>
                    <b>Username</b>: ${username}</br></br>
                    <b>Role</b>: ${role}</br>
                    <img id= "image" src= "${image}"></br>  
                    `;
        container.appendChild(userdata);
        ////ekhane user er sob data array te push ho66e
        usersData.push({
          Name: fullname,
          email: email,
          username:username,
       
          gender: gender,
          role: role,
        });
      }


    });
  };

function exportToCSV(data) {

  const csvHeaders = ["Name", "email", "username", "gender", "role"];
  const csvRows = data.map(item => {
    return `${item.Name},${item.email},${item.username},${item.gender},${item.role}`;
  });
  
 
  const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");
  
  
  const blob = new Blob([csvContent], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "posts_data.csv";
  link.click();

}