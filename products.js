window.onload = () => {
  let container = document.getElementsByClassName("container")[0];
  let load = document.createElement("div");
  load.classList.add("load");
  container.appendChild(load);

  fetch("https://dummyjson.com/products")
    .then((res) => {
      return res.json();
    })
    .then((obj) => {
      container.innerHTML = "";

      let productsData = obj.products;
      let productData = [];

      console.log(productsData);

      // let exportButton = document.createElement("button");
      // exportButton.id="exportButton"
      // exportButton.innerText = "Export to CSV";
      // container.appendChild(exportButton);
      // exportButton.addEventListener("click", () => {
      //   exportToCSV(usersData);
      // });

      productsData.forEach((prod, idx) => {
        let title = prod.title;
        let price = prod.price;
        let rating = prod.rating;
        let stock = prod.stock;
        let tags = prod.tags;
        let warrantyInformation = prod.warrantyInformation;
        let returnPolicy = prod.returnPolicy;
        let thumbnail = prod.thumbnail;
        let  main_pdct = document.createElement("div");
        main_pdct.classList.add("main_pdct")

        let pdct = document.createElement("div");
        pdct.classList.add("pdct");
        main_pdct.appendChild(pdct)

        let hiddenDiv= document.createElement("div")
        hiddenDiv.classList.add("hiddenDiv")
        main_pdct.appendChild(hiddenDiv)

        let middleDiv=document.createElement("div")
        middleDiv.classList.add("middleDiv")
        hiddenDiv.appendChild(middleDiv)
        middleDiv.innerText=`
        ${title}\n
        available: ${stock}
        `


        pdct.innerHTML = `
            <h3 id="h22">${title}</h3> </br>
            <hr id="hr">
            <div id="RtSt"><div><b>Rating</b>: ${rating}</div>    <div><b>Stock</b>: ${stock}</div></div></br>
            <b>Tags</b>: ${tags}</br>
            <img id="prdctimg" src="${thumbnail}"></br>
            <b>Price</b>: ${price}</br></br>
            <b>warranty_Information</b>: ${warrantyInformation}</br></br>
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

      let exportButton = document.createElement("button");
      exportButton.innerText = "Export to CSV";
      container.appendChild(exportButton);
      exportButton.addEventListener("click", () => {
        exportToCSV(productData);
      });
    });
};

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
