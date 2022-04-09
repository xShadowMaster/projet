// Cart
let cartIcon =  document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// Open Cart
cartIcon.onclick = () =>{
	cart.classList.add("active");
};
// Close Cart
closeCart.onclick = () => {
	cart.classList.remove("active");
};

// Cart Working JS
if (document.readyState == "loading"){
	document.addEventListener("DOMContentLoaded", ready);
} else {
	ready();
}

// Making Function
function ready() {
	// Remove Items From Cart
	var removeCartButtons = document.getElementsByClassName("cart-remove");
	console.log(removeCartButtons);
	for (var i = 0; i < removeCartButtons.length; i++) {
		var button = removeCartButtons[i];
		button.addEventListener("click", removeCartItem);
	}
	// Quantity changes
	var quantityInputs = document.getElementsByClassName("cart-quantity");
	for (var i = 0; i < quantityInputs.length; i++) {
		var input = quantityInputs[i];
		input.addEventListener("change", quantityChanged);
	}
	// Add To Cart
	var addCart = document.getElementsByClassName("add-cart");
	for (var i = 0; i < addCart.length; i++) {
		var button = addCart[i];
		button.addEventListener("click", addCartClicked);
	}
	//Buy Button Work
	document
	  .getElementsByClassName("btn-buy")[0]
	  .addEventListener("click", buyButtonClicked);
}
// Buy Button
function buyButtonClicked() {
	alert("tawa bara 7anderhom");
	var cartContent = document.getElementsByClassName("cart-content")[0];
	while (cartContent.hasChildNodes()) {
		cartContent.removeChild(cartContent.firstChild);
	}
	updatetotal();
}
// Remove Items From Cart
function removeCartItem(event) {
	var buttonClicked = event.target;
	buttonClicked.parentElement.remove();
	updatetotal();
}
//Quantity Changes
function quantityChanged(event) {
	var input = event.target;
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1;
	}
	updatetotal();
}
// Add To Cart
function addCartClicked(event) {
	var button = event.target;
	var x = document.getElementsByClassName("product-title")[0];
	var shopProducts = button.parentElement;
	var title =document.getElementsByClassName("product-title")[0].innerHTML;
	var price = document.getElementsByClassName("price")[0].innerHTML;
	var productImg = document.getElementsByClassName("product-img")[0].src;
	addProductToCart(title, price, productImg);
	updatetotal();
}
function addProductToCart(title, price, productImg) {
	var cartShopBox = document.createElement("div");
	cartShopBox.classList.add("cart-box");
	var cartItems = document.getElementsByClassName("cart-content")[0];
	var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
	for (var i = 0; i < cartItemsNames.length; i++) {
	  if (cartItemsNames[i].innerText == title) {
	  return;
	}
}
var cartBoxContent = `
<div class="box product-box">
            <img src="${productImg}" alt="" class="cart-img">
            <div class="content">
                <h2 class="product-title">${title}</h2>
                <div class="cart-price"><span class="price">${price}</span></div>
            </div>
        </div>`;

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
var x =document
.getElementsByClassName("cart-remove")[0];

   x.addEventListener("click", removeCartItem);
cartShopBox
   .getElementsByClassName("cart-quantity")[0]
   .addEventListener("change", quantityChanged);
}

// Update Total
function updatetotal() {
	var cartContent = document.getElementsByClassName("cart-content")[0];
	var cartBoxes = cartContent.getElementsByClassName("cart-box");
	var total = 0;
	for (var i = 0; i < cartBoxes.length; i++) {
		var cartBox = cartBoxes[i];
		var priceElement = cartBox.getElementsByClassName("cart-price")[0];
		var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
		var price = parseFloat(priceElement.innerText.replace("$", ""));
		var quantity = quantityElement.value;
		total = total + price * quantity;
	}
		// If price contain some cents value
		total = Math.round(total * 100) / 100;

		document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}