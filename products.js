window.onload = () => {
    fetch("https://dummyjson.com/products").then((res) => {
        return res.json();
    }).then((obj) => {
        let productsData = obj.products;
        let container = document.getElementsByClassName("container")[0];

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
            <h2>${title}</h2> </br>
            <hr id="hr">
            <pre><b>Rating</b>: ${rating}<t>               <b>Stock</b>: ${stock}</pre></br>
            <b>Tags</b>: ${tags}</br>
            <img id="prdctimg" src="${thumbnail}"></br>
            <b>Price</b>: ${price}</br></br>
            <b>warranty_Information</b>: ${warrantyInformation}</br></br>
            <b>Return_Policy</b>: ${returnPolicy}</br>
            `;
            
            container.appendChild(pdct);
        });
    });
}
