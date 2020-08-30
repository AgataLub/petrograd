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
function showProduct(myProduct) {
    console.log(myProduct)
    //finding the template
    const temp = document.querySelector("#productTemplate").content;
    //clone the template
    const myCopy = temp.cloneNode(true);
    //images concatenation
    const base = "https://kea-alt-del.dk/t5/site/imgs/";
    const mediumImg = base + "medium/" + myProduct.image + "-md.jpg";
    //fill out the template
    myCopy.querySelector("h2").textContent = myProduct.name;
    myCopy.querySelector(".category").textContent = myProduct.category;
    myCopy.querySelector(".picture").src = mediumImg;
    myCopy.querySelector(".price").textContent = "kr " + myProduct.price;
    myCopy.querySelector(".short").textContent = myProduct.shortdescription;
        myCopy.querySelector(".long").textContent = myProduct.longdescription;
    //decide if print vegetarian
    if (myProduct.vegetarian) {
        myCopy.querySelector(".vege").textContent = "Vegetarian";
    } else {
        myCopy.querySelector(".vege").classList.add("display_none");
    }
    //decide if print discount
    if (myProduct.discount > 0) {
        myCopy.querySelector(".discount").textContent = myProduct.discount + "% off!";
        myCopy.querySelector(".price").classList.add("crossed");
    }

    //append
    const parentElem = document.querySelector("section#starter");
    parentElem.appendChild(myCopy)
}
