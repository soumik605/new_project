let mode = document.getElementById("mode");
let maindiv = document.getElementById("maindiv");
let container = document.getElementById("container");
let dark_mode = document.getElementsByClassName("dark-mode")
console.log(document);

mode.addEventListener("click", () => {
  if (maindiv.classList.contains("dark-mode")) {
    maindiv.classList.remove("dark-mode");
    maindiv.style.background = '';
    if (container) {
      container.classList.remove("dark-mode");
     
    }
  } else {
    maindiv.classList.add("dark-mode");
    maindiv.style.background = "linear-gradient(to right, #200122, #6f0000)";
  }

});


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
