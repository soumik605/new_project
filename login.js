function generateCaptcha() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById("captcha_text").textContent = captcha;
}

document.getElementById("refresh_captcha").onclick = generateCaptcha;

let email_F = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let m = localStorage.getItem("em");
let mh = localStorage.getItem("ps");
let login = document.getElementById("login");

login.onclick = () => {
    let login_Email = document.getElementById("login_Email").value;
    let login_pass = document.getElementById("login_pass").value;
    let captcha_input = document.getElementById("captcha_input").value;
    let captcha_text = document.getElementById("captcha_text").textContent;

    if (email_F.test(login_Email)) {
        if (m && m.includes(login_Email) && mh && mh.includes(login_pass)) {
            if (captcha_input === captcha_text) {
                window.location.href = "users.html";
            } else {
                alert("Incorrect CAPTCHA");
            }
        } else {
            alert("Invalid Email & Password");
        }
    } else {
        alert("Invalid Format");
        window.location.href = "login.html";
    }
};
generateCaptcha();

