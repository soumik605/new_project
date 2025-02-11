let mode = document.getElementById("mode");
let maindiv = document.getElementById("maindiv")
let container= document.getElementById("container")

  mode.addEventListener("click", () => {

    if (maindiv.classList.contains("dark-mode")) {

      maindiv.classList.remove("dark-mode");
      container.classList.remove("dark-mode");
      maindiv.style.background = ''; 
     
    } else {
      
      maindiv.classList.add("dark-mode");
      maindiv.style.background = "linear-gradient(to right, #200122, #6f0000)";
    }
  });   