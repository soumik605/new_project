let select = document.getElementById("birthyear");
for (let i = 2025; i > 1905; i--) {
  let opt = document.createElement("option");
  opt.id = i;
  opt.value = i;
  opt.textContent = i;
  select.appendChild(opt);
}

let email_F = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let signup = document.getElementById("signup");
let login_Email = document.getElementById("login_Email");
let login_pass = document.getElementById("login_pass");
let m = localStorage.getItem("em")|| []
console.log(m);
let mh = localStorage.getItem("ps") || []
signup.onclick = () => {
  if (email_F.test(login_Email.value) && login_pass.value.length >= 4) {
    if (!m.includes(login_Email.value)){
        let em_list = JSON.parse(localStorage.getItem("em")) || [];
        let ps_list = JSON.parse(localStorage.getItem("ps")) || [];
        em_list.push(login_Email.value);
        ps_list.push(login_pass.value);
        localStorage.setItem("em", JSON.stringify(em_list));
        localStorage.setItem("ps", JSON.stringify(ps_list));
        window.location.href = "users.html";
    }
  }
};
//////  localStorage.clear()     // need to clear the localStorage
