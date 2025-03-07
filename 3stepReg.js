let reg_cont = document.getElementById("reg_cont")
let reg_cont2 = document.getElementById("reg_cont2")
let reg_cont3 = document.getElementById("reg_cont3")
let next1 = document.getElementById("next1")
let next2 = document.getElementById("next2")
let login_Email = document.getElementById("login_Email")
let login_Email_err = document.getElementById("login_Email_err")
let email_F = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let phone_F = /^[0-9]{10}$/;
let login_pass = document.getElementById("login_pass")
let login_pass_err = document.getElementById("login_pass_err")
let fst_name = document.getElementsByClassName("fst_name")[0]
let back2 = document.getElementById("back2")
let back3 = document.getElementById("back3")
let main_cont2 = document.getElementById("main_cont2")
let reg_ph = document.getElementById("reg_ph")
let reg_ph_err = document.getElementById("reg_ph_err")
next1.addEventListener("click", ()=>{
    let m = localStorage.getItem("em")|| []
    let mh = JSON.parse(localStorage.getItem("ps")) || [];
    console.log(m);
    console.log(mh);
    if (login_Email.value!=="") {
        if (email_F.test(login_Email.value)) {
            if (!m.includes(login_Email.value)) {
                login_Email_err.style.color="green"
                login_Email_err.innerHTML="Valied Email address"
                contfunc()   
            }else{
                login_Email_err.style.color="red"
                login_Email_err.innerHTML="Already Exist this Email address"
            }
        }else{
            login_Email_err.style.color="red"
            login_Email_err.innerHTML="Invalied Email Format"
        }
    }

})
next2.addEventListener("click", ()=>{
    if (login_pass.value.length>3 && fst_name.value!=="") {
        login_pass_err.innerHTML="Valied password"
        login_pass_err.style.color="green"
        contfunc2()        
    }else{
        login_pass_err.style.color="red"
        login_pass_err.innerHTML="Atleast 4 charater needed"
    }

})
function contfunc() {
    reg_cont.style.transform=`translate(${-500}px)`
    reg_cont.style.transitionDuration=`2s`
    reg_cont2.style.transform=`translate(${-500}px)`
    reg_cont2.style.transitionDuration=`2s`
    reg_cont3.style.transform=`translate(${-500}px)`
    reg_cont3.style.transitionDuration=`2s`   
}
function contfunc2() {
    reg_cont.style.transform=`translate(${-1000}px)`
    reg_cont.style.transitionDuration=`2s`
    reg_cont2.style.transform=`translate(${-1000}px)`
    reg_cont2.style.transitionDuration=`2s`
    reg_cont3.style.transform=`translate(${-1000}px)`
    reg_cont3.style.transitionDuration=`2s`   
}
back2.addEventListener("click", ()=>{
        contfuncc()    
})
back3.addEventListener("click", ()=>{
        contfuncc2()        
})
function contfuncc() {
    reg_cont.style.transform=`translate(${0}px)`
    reg_cont.style.transitionDuration=`2s`
    reg_cont2.style.transform=`translate(${0}px)`
    reg_cont2.style.transitionDuration=`2s`
    reg_cont3.style.transform=`translate(${0}px)`
    reg_cont3.style.transitionDuration=`2s`   
}
function contfuncc2() {
    reg_cont.style.transform=`translate(${-500}px)`
    reg_cont.style.transitionDuration=`2s`
    reg_cont2.style.transform=`translate(${-500}px)`
    reg_cont2.style.transitionDuration=`2s`
    reg_cont3.style.transform=`translate(${-500}px)`
    reg_cont3.style.transitionDuration=`2s`   
}

// 1111112222
finish.addEventListener("click",()=>{
    if (phone_F.test(reg_ph.value)) {
        contfunc3() 
        let em_list = JSON.parse(localStorage.getItem("em")) || [];
        let ps_list = JSON.parse(localStorage.getItem("ps")) || [];
        em_list.push(login_Email.value);
        ps_list.push(login_pass.value);
        localStorage.setItem("em", JSON.stringify(em_list));
        localStorage.setItem("ps", JSON.stringify(ps_list));
    }else{
        reg_ph_err.style.color="red"
        reg_ph_err.innerHTML="Ivalied Mobile number."
    }
})
function contfunc3() {
    console.log("REGISTRED");
    reg_cont3.style.display="flex"
    reg_cont3.style.color="green"
    main_cont2.style.scale="1.5"
    reg_cont3.style.justifyContent="center"
    reg_cont3.style.alignItems="center"
    reg_cont3.innerHTML=""
    reg_cont3.innerHTML="<div><pre><h1>         Congratulations</h1></br><h2>             Process Successfully</h2></pre></div>"
    setTimeout(() => {
        window.location.href = "users.html";
    }, 2000);
    
}


///// localStorage.removeItem("em")
///// localStorage.removeItem("ps")
