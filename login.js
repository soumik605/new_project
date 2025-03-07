let email_F = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
let m = localStorage.getItem("em")
let mh = localStorage.getItem("ps")
let login = document.getElementById("login")
let login_Email = document.getElementById("login_Email")
let login_pass = document.getElementById("login_pass")
login.onclick=()=>{
    if(email_F.test(login_Email.value)){
        if (m.includes(login_Email.value) && mh.includes(login_pass.value)) {
            window.location.href = "users.html";
        }else{
            alert("Invalied Email & Password")
        }
    }else{
        alert("Invalied Format")
        window.location.href = "login.html";
    }
}














































































































