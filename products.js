window.onload = async function () {
  await fetchAllUsers();
  await pdctDetails();
};

async function fetchAllUsers() {
  let container = document.getElementsByClassName("container")[0];
  let container2 = document.getElementById("container2");
  let pdctInfo = document.getElementById("pdctInfo");

  let load = document.createElement("div");
  load.classList.add("load");
  container.appendChild(load);

  await fetch("https://dummyjson.com/products")
    .then((res) => {
      return res.json();
    })
    .then((obj) => {
      container.innerHTML = "";

      let productsData = obj.products;
      let productData = [];

      console.log(productData);

      productsData.forEach((prod, idx) => {
        let title = prod.title;
        let price = prod.price;
        let rating = prod.rating;
        let stock = prod.stock;
        let tags = prod.tags;
        let warrantyInformation = prod.warrantyInformation;
        let returnPolicy = prod.returnPolicy;
        let thumbnail = prod.thumbnail;
        let main_pdct = document.createElement("div");
        main_pdct.classList.add("main_pdct");
        main_pdct.setAttribute("product_id", prod.id);
        let hiddenDiv = document.createElement("div");
        hiddenDiv.classList.add("hiddenDiv");
        main_pdct.appendChild(hiddenDiv);
        hiddenDiv.innerHTML = `<img id="prdctimg" src="${thumbnail}"></img>`;

        let pdct = document.createElement("div");
        pdct.classList.add("pdct");
        main_pdct.appendChild(pdct);

        pdct.innerHTML = `
            <h3 id="h22">${title}</h3> </br>
            <b>Price</b>: ${price} $</br></br>
            <b>Return_Policy</b>: ${returnPolicy}</br>
            `;
        container.appendChild(main_pdct);

        productData.push({
          title: title,
          price: price,
          rating: rating,
          warrantyInformation: warrantyInformation,
          tags: tags.join(", "),
        });
      });
      let exportButton = document.getElementById("pdct_exportButton");
      exportButton.addEventListener("click", () => {
        exportToCSV(productData);
      });
    });
}

function exportToCSV(data) {
  const csvHeaders = [
    "Title",
    "price",
    "rating",
    "warrantyInformation",
    "tags",
  ];
  const csvRows = data.map((item) => {
    return `${item.title},${item.price} ,${item.rating},${item.warrantyInformation},${item.tags}`;
  });

  const csvContent = [csvHeaders.join(","), ...csvRows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "posts_data.csv";
  link.click();
}

function pdctDetails() {
  let pdctInfo = document.getElementById("pdctInfo");
  let pdctDivs = document.getElementsByClassName("main_pdct");
  
  console.log(pdctDivs);

  if (pdctDivs) {
    Array.from(pdctDivs).forEach((div) => {
      div.addEventListener("click", async function () {
        console.log(div);
        
      

        pdctInfo.innerHTML = "";
        pdctInfo.style.display="block"
        let product = [];
        let pdct_id = div.getAttribute("product_id");

        await fetch(`https://dummyjson.com/products/${pdct_id}`)
          .then((response) => response.json())
          .then((data) => (product = data));

        let p = document.createElement("p");
        p.id="infoP"
        pdctInfo.innerHTML=`<img id="prdctInfoimg" src="${product.thumbnail}"></img>`
        p.innerText = `
        \nTitle : ${product.title}
        \nPrice : ${product.price} $
        \nstock : ${product.stock}
        \nRating : ${product.rating}
        \nWarranty : ${product.warrantyInformation}
        \n Return POlicy : ${product.returnPolicy}
        \nTags: ${product.tags}`;
        pdctInfo.appendChild(p);
      });
    });
  }
}
