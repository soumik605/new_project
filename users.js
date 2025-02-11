window.onload = function(){
        let container = document.getElementById("container");         
        let load = document.createElement("div");
        load.classList.add("load");
        container.appendChild(load);
        fetch("https://dummyjson.com/users").then (function(call){
            return call.json()
        })
        .then(function(object){
            container.innerHTML = "";
            let userlist = object.users
            let a =0;
            for (let a = 0;  a < userlist.length; a++) {
                    let fullname = `${userlist[a].firstName} ${userlist[a].maidenName} ${userlist[a].lastName}`
                    let age = userlist[a].age
                    let gender = userlist[a].gender
                    let email = userlist[a].email
                    let username = userlist[a].username
                    let image = userlist[a].image
                    let role = userlist[a].role
                  let userdata = document.createElement("div")           
                    userdata.classList.add("userdata")

                    userdata.innerHTML = `
                    <h2>${fullname}</h2> </br>
                    <hr id = "hr">
                    <pre><b>Age</b>: ${age}<t>              <b>Gender</b>: ${gender}</br></pre>
                    <b>Email</b>: ${email}</br></br>
                    <b>Username</b>: ${username}</br></br>
                    <b>Role</b>: ${role}</br>
                    <img id= "image" src= "${image}"></br>  
                    `
                    container.appendChild(userdata);
                }
        })
}