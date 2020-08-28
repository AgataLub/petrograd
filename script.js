fetch("https://kea-alt-del.dk/t5/api/productlist")
.then(function (response) {
    console.log(response)
    return response.json();
})

.then(function (data) {
    console.log(data)
})
