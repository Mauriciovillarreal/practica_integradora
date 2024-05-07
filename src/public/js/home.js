const socket = io();

socket.on('update-products', function (products) {
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = ''

    products.forEach(function (product) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
                <h2>${product.name}</h2>
                <div>${product._id}</div>
                <div>$${product.price}</div>
            `
        productsList.appendChild(listItem)
    })
})

console.log('soy el script de home')