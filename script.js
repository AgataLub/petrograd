fetch("https://kea-alt-del.dk/t5/api/productlist")
.then(function (response) {
    console.log(response)
    return response.json();
})

.then(function (data) {
    console.log(data)
    dataReceived(data);
})


function dataReceived(product) {
    //loop through products
    product.forEach(showProduct)
}


//executed once for each product
function showProduct(myProduct){
    console.log(myProduct)
    //finding the template
    const temp = document.querySelector("#productTemplate").content;
    //clone the template
    const myCopy = temp.cloneNode(true);
    //fill out the template
    myCopy.querySelector("h1").textContent = myProduct.name;
    myCopy.querySelector(".picture").src = myProduct.image;
    myCopy.querySelector(".price").textContent = myProduct.price;
    myCopy.querySelector(".discount").textContent = myProduct.discount;
    myCopy.querySelector(".vege").textContent = myProduct.vegetarian;
    myCopy.querySelector(".short").textContent = myProduct.shortdescripltion;
    //append
    const parentElem = document.querySelector("section#starter");
    parentElem.appendChild(myCopy)
}
