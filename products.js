window.onload = async function () {
  await fetchAllUsers();
  await pdctDetails();
};

let productsData = [];
let productsData2 = [];
let prd_id_lis = JSON.parse(localStorage.getItem("prd_id_lis")) || [];

async function fetchAllUsers() {
  let container = document.getElementsByClassName("container")[0];
  // let bodyy = document.body;
  container.innerHTML = "";

  let load = document.createElement("div");
  load.classList.add("load");
  container.appendChild(load);

  // let activeDelete = document.createElement("div")
  // activeDelete.id="activedelete"
  // bodyy.appendChild(activeDelete)
  // let activeproduct = document.createElement("button")
  // activeproduct.id = "activeproduct"
  // activeproduct.innerText = "Active Products"
  // let deleteproduct = document.createElement("button")
  // deleteproduct.id = "deleteproduct"
  // deleteproduct.innerText = "Delete Products"


  // activeDelete.appendChild(activeproduct)
  // activeDelete.appendChild(deleteproduct)
      // deleteproduct.onclick=()=>{
      //   container.innerHTML=""
      //   console.log(prd_lis)
      //   productsData = productsData.filter(prod => prd_id_lis.includes(prod.id));
      //   console.log(prd_id_lis)
      //   Sfunction(productsData);
      // }
  
  
  await fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((obj) => {
      container.innerHTML = "";
      productsData = obj.products;
      // let prd_lis=obj.products;
      productsData = obj.products.filter(prod => !prd_id_lis.includes(prod.id));

      // deleteproduct.onclick=()=>{
      //   container.innerHTML=""
      //   console.log(prd_lis)
      //   productsData = prd_lis.filter(prod => !prd_id_lis.includes(prod.id));
      //   console.log(prd_id_lis)
      //   Sfunction(prd_lis);
      // }
      
      let productTitles = [];
      productsData.forEach((dataa) => {
        productTitles.push(dataa.title)
      })
      productTitles.sort()
      productsData2 = productTitles.map((title) => 
        productsData.find((prod) => prod.title === title)
      );
      Sfunction(productsData);
    });
}

function Sfunction(data) {
  let container = document.getElementsByClassName("container")[0];
  container.innerHTML = "";
  // let activeDelete = document.createElement("div")
  // activeDelete.id="activedelete"
  // container.appendChild(activeDelete)
  // let activeproduct = document.createElement("button")
  // activeproduct.id = "activeproduct"
  // activeproduct.innerText = "Active Products"
  // let deleteproduct = document.createElement("button")
  // deleteproduct.id = "deleteproduct"
  // deleteproduct.innerText = "Delete Products"


  // activeDelete.appendChild(activeproduct)
  // activeDelete.appendChild(deleteproduct)
  //       // let deleteproduct = document.getElementById("deleteproduct")
  //     // deleteproduct.onclick=()=>{
  //     //   container.innerHTML=""
  //       // console.log(prd_lis)
  //     //   productsData = productsData.filter(prod => prd_id_lis.includes(prod.id));
  //     //   console.log(prd_id_lis)
  //     //   Sfunction(productsData);
  //     // }
  
  
  let sortpdctB = document.createElement("button");
  sortpdctB.textContent = "Sort By Title";
  sortpdctB.classList.add("sortpdctB");
  container.appendChild(sortpdctB);

  sortpdctB.addEventListener("click", () => {
    productsData2 = productsData2.filter(prod => !prd_id_lis.includes(prod.id));
    Sfunction(productsData2)
  });
  let buttonTop = document.createElement("div");
  buttonTop.classList.add("top-button");
  buttonTop.innerHTML = "⬆️";
  container.appendChild(buttonTop);
  let productData = [];
  container.onscroll = () => {
    if (container.scrollTop > 1) {
        buttonTop.style.visibility = "visible";
    } else {
        buttonTop.style.visibility = "hidden";
    }
}
buttonTop.onclick = () => {
    container.scrollTop = 0;
}

  data.forEach((prod) => {
    let main_pdct = document.createElement("div");
    main_pdct.classList.add("main_pdct");
    main_pdct.setAttribute("product_id", prod.id);

    let hiddenDiv = document.createElement("div");
    hiddenDiv.classList.add("hiddenDiv");
    hiddenDiv.innerHTML = `<img id="prdctimg" src="${prod.thumbnail}"></img>`;
    let delete_btn = document.createElement("span")
    delete_btn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`
    delete_btn.id = "delete_btn"
    hiddenDiv.appendChild(delete_btn)

    delete_btn.addEventListener("click", (e) => {
      e.stopPropagation();
      prd_id_lis.push(prod.id)
      localStorage.setItem("prd_id_lis", JSON.stringify(prd_id_lis))
      // console.log(prd_id_lis);
      del_func(prod.id)
    })

    main_pdct.appendChild(hiddenDiv);

    let pdct = document.createElement("div");
    pdct.classList.add("pdct");
    pdct.innerHTML = `
      <h3 id="h22">${prod.title}</h3></br>
      <b>Price</b>: ${prod.price} $</br></br>
      <b>Return Policy</b>: ${prod.returnPolicy}</br>
    `;
    main_pdct.appendChild(pdct);
    container.appendChild(main_pdct);

    productData.push({
      title: prod.title,
      price: prod.price,
      rating: prod.rating,
      warrantyInformation: prod.warrantyInformation,
      tags: prod.tags.join(", "),
    });
  });

  let exportButton = document.getElementById("pdct_exportButton");
  if (exportButton) {
    exportButton.addEventListener("click", () => {
      exportToCSV(productData);
    });
  }
}

function del_func(id) {
  productsData = productsData.filter(
    function (itm) {
      return itm.id !== id
    }
  )

  Sfunction(productsData)
  let pdctInfo = document.getElementById("pdctInfo");
  if (pdctInfo.style.display === "block") {
    pdctInfo.style.display = "none";
    pdctInfo.innerHTML = "";
  }
}

function exportToCSV(data) {
  const csvHeaders = ["Title", "Price", "Rating", "Warranty Information", "Tags"];
  const csvRows = data.map((item) => {
    return `${item.title},${item.price},${item.rating},${item.warrantyInformation},${item.tags}`;
  });

  const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "products_data.csv";
  link.click();
}

function pdctDetails() {
  let pdctInfo = document.getElementById("pdctInfo");
  document.addEventListener("click", async function (event) {
    if (event.target.closest(".main_pdct")) {
      let div = event.target.closest(".main_pdct");
      pdctInfo.innerHTML = "";
      pdctInfo.style.display = "block";

      let product = await fetch(`https://dummyjson.com/products/${div.getAttribute("product_id")}`)
        .then((response) => response.json());

      let p = document.createElement("p");
      p.id = "infoP";
      pdctInfo.innerHTML = `<img id="prdctInfoimg" src="${product.thumbnail}"></img>`;
      p.innerText = `
        Title : ${product.title}
        Price : ${product.price} $
        Stock : ${product.stock}
        Rating : ${product.rating}
        Warranty : ${product.warrantyInformation}
        Return Policy : ${product.returnPolicy}
        Tags: ${product.tags}`;
      pdctInfo.appendChild(p);
    }
  });
}

if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
}

// localStorage.removeItem("prd_id_lis")      // don't touch it beacuse it re returns the deleted products.