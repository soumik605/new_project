let mode = document.getElementById("mode");
let maindiv = document.getElementById("maindiv");
let container = document.getElementById("container");
let dark_mode = document.getElementsByClassName("dark-mode")

// mode.addEventListener("click", async () => {
//   if (maindiv.classList.contains("dark-mode")) {
//     maindiv.classList.remove("dark-mode");
//     if (container) {
//       container.classList.remove("dark-mode");
     
//     }
//   } else {
//     maindiv.classList.add("dark-mode");
//     maindiv.style.background = "linear-gradient(to right, #200122, #6f0000)";
//   }

// });


  // mode.addEventListener("click",  () => {

  //   if (maindiv.classList.contains("dark-mode")) {

  //     maindiv.classList.remove("dark-mode");
  //     container.classList.remove("dark-mode");
  //     maindiv.style.background = ''; 
     
  //   } else {
      
  //     maindiv.classList.add("dark-mode");
  //     maindiv.style.background = "linear-gradient(to right, #200122, #6f0000)";
  //   }
  // });   



document.addEventListener("DOMContentLoaded", function () {
    let currentPage = window.top.location.pathname.split("/").pop();
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




