function init() {
    fetch("https://kea-alt-del.dk/t5/api/categories").then(r => r.json()).then(
        function (data) {
            categoriesReceived(data)
        }
    )
}
init();

function categoriesReceived(cats) {
    createNavigation(cats);
    createSections(cats);
    fetchProducts();
}

function createSections(categories) {
    categories.forEach(category => {
        const section = document.createElement("section");
        section.setAttribute("id", category);
        const h1 = document.createElement("h1");
        h1.textContent = category;
        h1.setAttribute("id", `#${category}`)
        section.appendChild(h1);
        document.querySelector(".productlist").appendChild(section);

    })
}

function createNavigation(categories) {
    categories.forEach(cat => {
        const a = document.createElement("a");
        a.textContent = cat;
        a.setAttribute("href", `#${cat}`); //interpolation
        document.querySelector("nav").appendChild(a);
    })
}


function fetchProducts() {

    fetch("https://kea-alt-del.dk/t5/api/productlist")
        .then(function (response) {
            console.log(response)
            return response.json();
        })

        .then(function (data) {
            console.log(data)
            dataReceived(data);
        })

}

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
        myCopy.querySelector(".vege").classList.add("vege_style");
    } else {
        myCopy.querySelector(".vege").classList.add("display_none");
    }
    //show alcohol content
    if (myProduct.alcohol > 0) {
        myCopy.querySelector(".alcohol").textContent = myProduct.alcohol + "% alcohol content";
        myCopy.querySelector(".alcohol").classList.add("alco_style");
    } else {
        myCopy.querySelector(".alcohol").classList.add("display_none");
    }
    //decide if print discount
    if (myProduct.discount > 0) {

        function calculateDiscount(price, discountPercentage = 0) {
            return price - (discountPercentage/100 * price);
        }

        const newPrice = calculateDiscount(myProduct.price, myProduct.discount);

        myCopy.querySelector(".discount").textContent = myProduct.discount + "% off! New price: " + newPrice + "kr";
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
        myCopy.querySelector("article").classList.add("gray");
    } else {
        myCopy.querySelector(".soldout").classList.add("display_none");

    }



    //FILTER BUTTONS

    if (myProduct.vegetarian == true) {
        const article = myCopy.querySelector("article");
        article.classList.add("vege");
    }

    if (myProduct.alcohol == 0) {
        const article = myCopy.querySelector("article");
        article.classList.add("alcohol");
    }

    showDish(myProduct, myCopy)


    //append
    const parentElem = document.querySelector("section#" + myProduct.category);
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
    alcoholfilter.classList.toggle("active");

    const articles =
        document.querySelectorAll("article:not(.alcohol)");

    articles.forEach(elem => {
        elem.classList.toggle("display_none");
    })
}


//MODAL
//close the modal when clicked
const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
    modal.classList.add("display_none");
});

function showDish(dish, myCopy) {
    myCopy.querySelector(".open_modal").addEventListener("click", () => {
        fetch(`https://kea-alt-del.dk/t5/api/product?id=${dish.id}`)
            .then(res => res.json())
            .then(showDetails);
    });
}

//once we have our data, ....
function showDetails(data) {

    const base = "https://kea-alt-del.dk/t5/site/imgs/";
    const mediumImg = base + "medium/" + data.image + "-md.jpg";

    modal.querySelector(".modal-name").textContent = data.name;
    modal.querySelector(".modal-description").textContent = data.longdescription;
    modal.querySelector(".modal-image").src = mediumImg;
    modal.querySelector(".modal-price").textContent = data.price + " kr";
    modal.classList.remove("display_none");
}

