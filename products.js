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
      productsData.forEach((prod, idx) => {
        let title = prod.title;
        let price = prod.price;
        let rating = prod.rating;
        let stock = prod.stock;
        let tags = prod.tags;
        let warrantyInformation = prod.warrantyInformation;
        let returnPolicy = prod.returnPolicy;
        let thumbnail = prod.thumbnail;

        let pdct = document.createElement("div");
        pdct.classList.add("pdct");

        pdct.innerHTML = `
            <h3 id="h22">${title}</h3> </br>
            <hr id="hr">
            <div id="RtSt"><div><b>Rating</b>: ${rating}</div>    <div><b>Stock</b>: ${stock}</div></div></br>
            <b>Tags</b>: ${tags}</br>
            <img id="prdctimg" src="${thumbnail}"></br>
            <b>Price</b>: ${price}</br></br>
            <b>warranty_Information</b>: ${warrantyInformation}</br></br>
            <b>Return_Policy</b>: ${returnPolicy}</br>
<<<<<<<<< Temporary merge branch 1
            `
=========
            `;

>>>>>>>>> Temporary merge branch 2
            container.appendChild(pdct);
        });
    });
}