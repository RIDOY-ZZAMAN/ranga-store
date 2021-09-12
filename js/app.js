//Getting  all the data by loadProducts function 
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
//calling the function
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <h4>Rating: ${product.rating.rate}</h4>
      <h5>Number of Ratings: ${product.rating.count}</h5>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary">add to cart</button>
      <button id="details-btn" class="btn btn-success" onclick="loadDetails(${product.id})">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

let count = 0;

//add to cart function
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

//funtion for get input value
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  let grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};


//-------------------- load and display detail's part start--------------------------

//loading a single product using produst's id
const loadDetails = async id => {
  const url = `https://fakestoreapi.com/products/${id}`
  const res = await fetch(url);
  const data = await res.json();
  displayProductDetails(data);
}

//displaying a single product on the website using displayProductDetails function
const displayProductDetails = products => {
  const showProductsDetails = document.getElementById('showProductsDetails');
  showProductsDetails.textContent = '';
  const div = document.createElement('div');
  div.innerHTML = `
      <img src="${products.image}" height="80" width="80" alt="A Product's Image">
        <h4>Title: ${products.title}</h3>
        <h4>Category: ${products.category}</h4> 
      `
  showProductsDetails.appendChild(div)
}
//-------------------- load and display detail's part end--------------------------