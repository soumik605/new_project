let mode = document.getElementById("mode");
let maindiv = document.getElementById("maindiv");
let container = document.getElementById("container");
let dark_mode = document.getElementsByClassName("dark-mode")
let tooltip = document.getElementsByClassName("tooltip")




document.addEventListener("DOMContentLoaded", function () {
    let currentPage = window.top.location.pathname.split("/").pop();
    console.log(currentPage);
    document.querySelectorAll(".button").forEach(button => {
        let link = button.parentElement; 
        if (link && link.tagName === "A") { 
            let linkPage = link.getAttribute("href").split("/").pop();
            if (currentPage === linkPage) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        }
    });
});
window.addEventListener("storage", function (event) {
    if (event.key === "darkModeUpdated") {
        maindiv.classList.toggle("inner_dark_mode") 
    }
});

    if(localStorage.getItem("darkMode") === "enabled"){
        maindiv.classList.toggle("inner_dark_mode")

      }
  
      window.addEventListener("storage", function (e) {
        if (e.key == "sidebartype") {
            let sidebarvalue = localStorage.getItem("sidebartype")
          console.log(sidebarvalue);
          maindiv.classList=""
          maindiv.classList.toggle(sidebarvalue)
            
        }
    });
    

