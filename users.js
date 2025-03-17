window.onload = function () {
  let body = document.body;

  let container = document.createElement("div");
  container.id = "container";
  body.appendChild(container);

  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
  }

  let load = document.createElement("div");
  load.classList.add("load");
  container.appendChild(load);

  let user_list_count = localStorage.getItem("user_list_count") || [10];
  let limit = user_list_count;
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

        let users_num_select = document.createElement("select");
        users_num_select.id = "users_num_select";
        let count = 0;
        for (let i = 0; i < 208; i++) {
          count++;
          let users_num_op = document.createElement("option");
          users_num_op.value = `${count}`;
          users_num_op.id = `${count}`;
          users_num_op.innerHTML = `${count}`;
          users_num_select.appendChild(users_num_op);
        }

        container.appendChild(users_num_select);
        let users_num = users_num_select.value;
        let user_list_count2 = localStorage.getItem("user_list_count") || [10];
        let users_num_op2 = document.getElementById(`${user_list_count2}`);
        users_num_op2.selected = true;
        users_num_select.onchange = () => {
          if (users_num_select.value) {
            localStorage.setItem("user_list_count", users_num_select.value);
          }
          window.location.href = "users.html";
        };

        let exportButton = document.createElement("button");
        exportButton.id = "exportButton";
        exportButton.innerText = "Export to CSV";
        container.appendChild(exportButton);

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
          let sortedByName = userlist_2.sort((a, b) =>
            a.firstName.localeCompare(b.firstName)
          );
          userbodyfunc(sortedByName);
        });

        sortbydesending.addEventListener("click", () => {
          let sortedByName = userlist_2.sort((a, b) =>
            b.firstName.localeCompare(a.firstName)
          );
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
        let mainTable = document.createElement("div");
        let table = document.createElement("table");
        table.border = "1";
        table.id = "table";
        table.style.width = "100%";
        mainTable.id = "mainTable";
        let tr = document.createElement("tr");

        let th0 = document.createElement("th");
        th0.innerHTML = "✓ Count";
        let td1 = document.createElement("th");
        td1.innerHTML = `Fullname`;
        let td2 = document.createElement("th");
        td2.innerHTML = `Age`;
        let td3 = document.createElement("th");
        td3.innerHTML = `Role`;
        let td4 = document.createElement("th");
        td4.innerHTML = `Username`;
        let td5 = document.createElement("th");
        td5.innerHTML = `Gender`;
        let td6 = document.createElement("th");
        td6.innerHTML = `Email`;

        tr.appendChild(th0);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        table.appendChild(tr);
        let checkboxCount = 0;
        userlist_2.forEach((user) => {
          console.log(user);

          let fullname = `${user.firstName} ${user.maidenName} ${user.lastName}`;
          let age = user.age;
          let gender = user.gender;
          let email = user.email;
          let username = user.username;
          let image = `<img id="userimg" src=${user.image}></img>`;
          let role = user.role;
          let phone = user.phone;
          let address = user.address.address;
          let company = user.company.name;
          let tr = document.createElement("tr");
          tr.classList.add("tr");

          let td0 = document.createElement("td");
          let checkbox = document.createElement("input");
          checkbox.setAttribute("type", "checkbox");
          checkbox.classList.add("row-checkbox");
          td0.appendChild(checkbox);
          checkbox.addEventListener("click", () => {
            checkbox.classList.toggle("checked");
          });

          let td1 = document.createElement("td");
          td1.innerHTML = `${fullname}`;
          let td2 = document.createElement("td");
          td2.innerHTML = `${age}`;
          let td3 = document.createElement("td");
          td3.innerHTML = `${role}`;
          let td4 = document.createElement("td");
          td4.innerHTML = `${username}`;
          let td5 = document.createElement("td");
          td5.innerHTML = `${gender}`;
          let td6 = document.createElement("td");
          td6.innerHTML = `${email}`;

          let accordionRow = document.createElement("tr");
          accordionRow.classList.add("accordion-row");
          accordionRow.style.display = "none";

          let accordionContent = document.createElement("td");
          accordionContent.colSpan = 7;
          accordionContent.innerHTML = `
            <div class="accordion-content">
              <img src="${user.image}" alt="User Image" style="width: 50px; height: 50px; border-radius: 50%;">
              <p><strong>Phone:</strong> ${user.phone}</p>
              <p><strong>Address:</strong> ${user.address.address}, ${user.address.city}</p>
              <p><strong>Company:</strong> ${user.company.name}</p>
            </div>
          `;

          tr.appendChild(td0);

          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td4);
          tr.appendChild(td5);
          tr.appendChild(td6);
          table.appendChild(tr);
          accordionRow.appendChild(accordionContent);
          table.appendChild(accordionRow);
          mainTable.appendChild(table);
          container.appendChild(mainTable);

          table.style.marginTop = "40px";

          td1.style.height = "30px";
          td1.style.paddingLeft = "50px";
          td2.style.height = "30px";
          td2.style.textAlign = "center";
          td3.style.height = "30px";
          td3.style.paddingLeft = "50px";
          td4.style.height = "30px";
          td4.style.paddingLeft = "50px";
          td5.style.height = "30px";
          td5.style.paddingLeft = "50px";
          td6.style.height = "30px";
          td6.style.paddingLeft = "50px";
          usersData.push({
            Name: fullname,
            email: email,
            username: username,
            gender: gender,
            role: role,
          });

          tr.addEventListener("click", function () {
            accordionRow.style.display =
              accordionRow.style.display === "none" ? "table-row" : "none";
          });
        });
        exportButton.addEventListener("click", () => {
          let selectedUsers = [];
          document
            .querySelectorAll(".row-checkbox:checked")
            .forEach((checkbox, index) => {
              selectedUsers.push(usersData[index]);
            });
          if (selectedUsers.length > 0) {
            exportToCSV(selectedUsers);
          } else {
            exportToCSV(usersData);
            
          }
        });

        searchInput.addEventListener("input", () => {
          let searchText = searchInput.value.toLowerCase();
          userbodyfunc.searchValue = searchText;

          let userlist_2 = userlist.filter((user) =>
            `${user.firstName} ${user.lastName}`
              .toLowerCase()
              .includes(searchText)
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

let buttonTop = document.createElement("div");
buttonTop.classList.add("top-button");

buttonTop.innerHTML = "⬆️";
document.body.appendChild(buttonTop);

window.onscroll = () => {
  if (document.documentElement.scrollTop > 1 || document.body.scrollTop > 1) {
    buttonTop.style.visibility = "visible";
  } else {
    buttonTop.style.visibility = "hidden";
  }
};
buttonTop.onclick = () => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};
///// localStorage.removeItem("user_list_count")
