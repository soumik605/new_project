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
let main_cont = document.getElementById("main_cont")
let main_cont2 = document.getElementById("main_cont2")
let reg_ph = document.getElementById("reg_ph")
let reg_ph_err = document.getElementById("reg_ph_err")
let imgg= "no img";
document.getElementById("imageUpload").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // let profileImage = document.getElementById("profileImage");
            profileImage.src = e.target.result;
            profileImage.style.display = "block";
            imgg = e.target.result
            // let profileImages = JSON.parse(localStorage.getItem("profileImages") || "[]");
            // profileImages.push(e.target.result)
            // localStorage.setItem("profileImages", JSON.stringify(profileImages));
            localStorage.setItem("profileImage", e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

next1.addEventListener("click", ()=>{
    let m = localStorage.getItem("em")|| []
    let mh = JSON.parse(localStorage.getItem("ps")) || [];
    let userlist = JSON.parse(localStorage.getItem("userList")) || [];
    if (login_Email.value!=="") {
        if (email_F.test(login_Email.value)) {
            // if (!m.includes(login_Email.value)) {
            if (!userlist.some(user => user.email === login_Email.value)){
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


finish.addEventListener("click",()=>{
    let fst_name = document.getElementsByClassName("fst_name")[0]
    let sur_name = document.getElementsByClassName("sur_name")[0]
    let sexx = document.querySelector('input[name="sexx"]:checked');
    let reg_ph = document.getElementById("reg_ph")
    // let imgElement = document.getElementById("profileImage");
    // imgElement.style.margin="100px"
    if (phone_F.test(reg_ph.value)) {
        contfunc3() 
        // let em_list = JSON.parse(localStorage.getItem("em")) || [];
        
        // let ps_list = JSON.parse(localStorage.getItem("ps")) || [];
        // let full_name_lis = JSON.parse(localStorage.getItem("full_name_lis")) || [];
        // let sexx_lis = JSON.parse(localStorage.getItem("sexx_lis")) || [];
        // let reg_ph_lis = JSON.parse(localStorage.getItem("reg_ph_lis")) || [];
        // // let pro_imges = JSON.parse(localStorage.getItem("pro_imges")) || [];
        // em_list.push(login_Email.value);
        // let userpassword=btoa(login_pass.value)
        // ps_list.push(userpassword);
        // full_name_lis.push(`${fst_name.value} ${sur_name.value}`);
        // sexx_lis.push(sexx.value);
        // reg_ph_lis.push(reg_ph.value);
        // // if (imgElement.src!=="http://127.0.0.1:5500/3stepReg.html") {
        // //     pro_imges.push(imgElement.src);
        // // }else{
        // //     pro_imges.push("No Profile");
        // // }
        // localStorage.setItem("em", JSON.stringify(em_list));
        // localStorage.setItem("ps", JSON.stringify(ps_list));
        // localStorage.setItem("full_name_lis", JSON.stringify(full_name_lis));
        // localStorage.setItem("sexx_lis", JSON.stringify(sexx_lis));
        // localStorage.setItem("reg_ph_lis", JSON.stringify(reg_ph_lis));
        // localStorage.setItem("pro_imges", JSON.stringify(pro_imges));
        // // console.log(`Emails\n`,em_list);
        // // console.log(`Passwords\n`,ps_list);
        // // console.log(`Fullnames\n`,full_name_lis);
        // // console.log(`Genders\n`,sexx_lis);
        // // console.log(`Phone Numbers\n`,reg_ph_lis);
        // // console.log(`Profile photos\n`,pro_imges);
        
        let userList = JSON.parse(localStorage.getItem("userList")) || [];
        console.log(userList);
        let lasUseId = 0;
        if (userList.at(-1)) {
            lasUseId=Number(userList.at(-1).id)+1;
            }
            let user = {
                id: `${lasUseId}`,
                email: login_Email.value,
                password: btoa(login_pass.value),
                fulname: `${fst_name.value} ${sur_name.value}`,
                gender: sexx.value,
                phone: reg_ph.value,
                Image: `${imgg}`
            }
            // let profileImages = JSON.parse(localStorage.getItem("profileImages") || "[]");
            // profileImages.push(e.target.result)
            // localStorage.setItem("profileImages", JSON.stringify(profileImages));
            localStorage.setItem("profileImage", imgg);

            // console.log(user);
            userList.push(user);
            localStorage.setItem("userList", JSON.stringify(userList));

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
    main_cont.style.scrollbarWidth = "none"
    reg_cont3.style.justifyContent="center"
    reg_cont3.style.alignItems="center"
    reg_cont3.innerHTML=""
    reg_cont3.innerHTML="<div><pre><h1>         Congratulations</h1></br><h2>             Process Successfully</h2></pre></div>"
    setTimeout(() => {
        localStorage.setItem("loginTime", new Date().toLocaleString());
        localStorage.setItem("is_Login", "yes");
        localStorage.setItem("fromlogin", "no")
        window.location.href = "users.html";
    }, 2000);
    
}
// document.getElementById("imageUpload").addEventListener("change", function(event) {
//     const file = event.target.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             // let profileImage = document.getElementById("profileImage");
//             profileImage.src = e.target.result;
//             profileImage.style.display = "block";
//             let profileImages = JSON.parse(localStorage.getItem("profileImages") || "[]");
//             profileImages.push(e.target.result)
//             localStorage.setItem("profileImages", JSON.stringify(profileImages));
//             localStorage.setItem("profileImage", e.target.result);
//         };
//         reader.readAsDataURL(file);
//     }
// });


///// localStorage.removeItem("em")
///// localStorage.removeItem("ps")
///// localStorage.removeItem("full_name_lis")
///// localStorage.removeItem("sexx_lis")
///// localStorage.removeItem("reg_ph_lis")
///// localStorage.removeItem("pro_imges")

///// localStorage.removeItem("is_Login")
// console.log(userpassword);

///// localStorage.removeItem("profileImage")
///// localStorage.removeItem("profileImages")
// localStorage.clear()