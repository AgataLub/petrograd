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
    //console.log(myProduct)
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
    } else {
        myCopy.querySelector(".discount").classList.add("display_none");
    }
    // add sold out - example 1
    //    if(myProduct.soldout){
    //        const p = document.createElement("p");
    //        p.textContent = "Sold out";
    //        myCopy.querySelector("article").appendChild(p);
    //    }

    //add sold out - example 2
    if (myProduct.soldout == true) {
        myCopy.querySelector(".soldout").textContent = "Sold out";
    } else {
        myCopy.querySelector(".soldout").classList.add("display_none");
    }



    //set up filtering

    //1. Find the element


    //2. Add the element

    if (myProduct.vegetarian == true) {
        const article = myCopy.querySelector("article");
        article.classList.add("vege");
    }

//append
    const parentElem = document.querySelector("section#starter");
    parentElem.appendChild(myCopy)

}



    const veggiefilter = document.querySelector("#veggiefilter");
    veggiefilter.addEventListener("click", veggieFilterClicked);

    function veggieFilterClicked() {
        //select all non vege
        console.log("veggieFilterClicked");

        veggiefilter.classList.toggle("active");

        const articles =
            document.querySelectorAll("article:not(.vege)");

        articles.forEach(elem => {
            elem.classList.toggle("display_none");
        })
    }

     const alcoholfilter = document.querySelector("#alcoholfilter");
    alcoholfilter.addEventListener("click", alcoholFilterClicked);

    function alcoholFilterClicked() {
        //select all non vege
        console.log("alcoholFilterClicked");

        alcoholfilter.classList.toggle("active");

        const articles =
            document.querySelectorAll("article:not(.alcohol)");

        articles.forEach(elem => {
            elem.classList.toggle("display_none");
        })
    }

