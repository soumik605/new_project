window.onload = function () {
  let body = document.body;

  let container = document.createElement("div");
  container.id = "container";
  body.appendChild(container);

  if(localStorage.getItem("darkMode") === "enabled"){
    document.body.classList.add("dark-mode");
  }

  let load = document.createElement("div");
  load.classList.add("load");
  container.appendChild(load);

let user_list_count = localStorage.getItem("user_list_count")
  let limit= user_list_count
  fetch(`https://dummyjson.com/users?limit=${limit}`)
    .then((call) => call.json())
    .then((object) => {
      container.innerHTML = ""; 
      let userlist = object.users;
      let usersData = [];
      let isFirstRender = true;

      function userbodyfunc(userlist_2) {
        container.innerHTML = "";

        let searchUser = document.createElement("div");
        searchUser.classList.add("searchUser");

        let searchIcon = document.createElement("div");
        searchIcon.classList.add("searchIcon");
        searchIcon.innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-6'>
                                  <path strokeLinecap='round' strokeLinejoin='round' d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z' />
                                </svg>`;

        let searchInput = document.createElement("input");
        searchInput.placeholder = "Search User";
        searchInput.spellcheck = false;
        searchInput.classList.add("searchInput");

        if (userbodyfunc.searchValue) {
          searchInput.value = userbodyfunc.searchValue;
        }

        searchUser.appendChild(searchIcon);
        searchUser.appendChild(searchInput);
        container.appendChild(searchUser);

        if (!isFirstRender) {
          searchInput.focus();
        }
        isFirstRender = false;


        let users_num = document.createElement("input")
        users_num.placeholder = "Number of users           ↲"
        users_num.id = "users_num"
        users_num.style.padding="10px"
        users_num.style.borderRadius="10px"
        users_num.style.fontSize="17px"
        users_num.style.transform="translateY(4px)"

        users_num.type = "number"
        users_num.id="user_nu"
        container.appendChild(users_num)
        users_num.onchange=()=>{
          if (users_num.value) {
            localStorage.setItem("user_list_count",users_num.value)
            console.log("d");
          }
            window.location.href = "users.html";
        }

        let exportButton = document.createElement("button");
        exportButton.id = "exportButton";
        exportButton.innerText = "Export to CSV";
        container.appendChild(exportButton);

        exportButton.addEventListener("click", () => {
          exportToCSV(usersData);
        });
        let sortingButtons = document.createElement("div");
        sortingButtons.classList.add("sorting-buttons");

        let sortbyassending = document.createElement("button");
        sortbyassending.innerText = "Sort by First Name Ascending";
        sortingButtons.appendChild(sortbyassending);

        let sortbydesending = document.createElement("button");
        sortbydesending.innerText = "Sort by First Name Descending";
        sortingButtons.appendChild(sortbydesending);

        let sortByAgeAsc = document.createElement("button");
        sortByAgeAsc.innerText = "Sort by Age Ascending";
        sortingButtons.appendChild(sortByAgeAsc);

        let sortByAgeDesc = document.createElement("button");
        sortByAgeDesc.innerText = "Sort by Age Descending";
        sortingButtons.appendChild(sortByAgeDesc);

        container.appendChild(sortingButtons);
        sortbyassending.addEventListener("click", () => {
          let sortedByName = userlist_2.sort((a, b) => a.firstName.localeCompare(b.firstName));
          userbodyfunc(sortedByName);
        });

        sortbydesending.addEventListener("click", () => {
          let sortedByName = userlist_2.sort((a, b) => b.firstName.localeCompare(a.firstName));
          userbodyfunc(sortedByName);
        });

        sortByAgeAsc.addEventListener("click", () => {
          let sortedByAge = userlist_2.sort((a, b) => a.age - b.age);
          userbodyfunc(sortedByAge);
        });

        sortByAgeDesc.addEventListener("click", () => {
          let sortedByAge = userlist_2.sort((a, b) => b.age - a.age);
          userbodyfunc(sortedByAge);
        });
        let mainTable = document.createElement("div")
        let table = document.createElement("table")
        table.border="1";
        table.id="table";
        table.style.width="100%"
        mainTable.id="mainTable"
        let tr = document.createElement("tr")
        let td1 = document.createElement("th")
        td1.innerHTML=`Fullname`
        let td2 = document.createElement("th")
        td2.innerHTML=`Age`
        let td3 = document.createElement("th")
        td3.innerHTML=`Role`
        let td4 = document.createElement("th")
        td4.innerHTML=`Username`
        let td5 = document.createElement("th")
        td5.innerHTML=`Gender`
        let td6 = document.createElement("th")
        td6.innerHTML=`Email`
  
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)
        tr.appendChild(td6)
        table.appendChild(tr)


        userlist_2.forEach((user) => {
          let fullname = `${user.firstName} ${user.maidenName} ${user.lastName}`;
          let age = user.age;
          let gender = user.gender;
          let email = user.email;
          let username = user.username;
          let image = user.image;
          let role = user.role;
          let tr = document.createElement("tr")
          let td1 = document.createElement("td")
          td1.innerHTML=`${fullname}`
          let td2 = document.createElement("td")
          td2.innerHTML=`${age}`
          let td3 = document.createElement("td")
          td3.innerHTML=`${role}`
          let td4 = document.createElement("td")
          td4.innerHTML=`${username}`
          let td5 = document.createElement("td")
          td5.innerHTML=`${gender}`
          let td6 = document.createElement("td")
          td6.innerHTML=`${email}`

          tr.appendChild(td1)
          tr.appendChild(td2)
          tr.appendChild(td3)
          tr.appendChild(td4)
          tr.appendChild(td5)
          tr.appendChild(td6)
          table.appendChild(tr)
          mainTable.appendChild(table)
          container.appendChild(mainTable)

          table.style.marginTop="40px"
          td1.style.height="30px"
          td1.style.paddingLeft="50px"
          td2.style.height="30px"
          td2.style.textAlign="center"
          td3.style.height="30px"
          td3.style.paddingLeft="50px"
          td4.style.height="30px"
          td4.style.paddingLeft="50px"
          td5.style.height="30px"
          td5.style.paddingLeft="50px"
          td6.style.height="30px"
          td6.style.paddingLeft="50px"
          usersData.push({
            Name: fullname,
            email: email,
            username: username,
            gender: gender,
            role: role,
          });
        });

        searchInput.addEventListener("input", () => {
          let searchText = searchInput.value.toLowerCase();
          userbodyfunc.searchValue = searchText;

          let userlist_2 = userlist.filter((user) =>
            `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchText)
          );
          userbodyfunc(userlist_2);
        });
      }

      userbodyfunc(userlist); 
    });
};

function exportToCSV(data) {
  const csvHeaders = ["Name", "Email", "Username", "Gender", "Role"];
  const csvRows = data.map((item) => {
    return `${item.Name},${item.email},${item.username},${item.gender},${item.role}`;
  });

  const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "users_data.csv";
  link.click();
}

