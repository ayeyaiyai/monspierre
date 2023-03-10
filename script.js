if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

var itemsInCart = 0;
var totalPrice = 0;
const mySideBar = document.getElementById("mySidebar");
const myOverlay = document.getElementById("overlay");
var itemsInCartDisplay = document.getElementById("items-cart");
itemsInCartDisplay.textContent = itemsInCart;
var total = 0;

function ready() {
  var removeCartItemButtons = document.getElementsByClassName('delete-cart-item');

  for (i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)
  }

  var addToCartButtons = document.getElementsByClassName('add-to-cart')
  for (i = 0; i < addToCartButtons.length; i++) {
    var button=addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
  }
}

function removeCartItem(event){
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove() 
  updateCartTotal()
  itemsInCart = itemsInCart - 1;
  itemsInCartDisplay.textContent = itemsInCart;
}

function addToCartClicked(event) {
  var button = event.target
  var shopItem = button.parentElement
  var title = shopItem.getElementsByClassName('product-title')[0].innerText
  var price = shopItem.getElementsByClassName('product-price')[0].innerText
  var imageSrc = shopItem.getElementsByClassName('product-photo')[0].src
  addItemToCart(title, price, imageSrc)
  updateCartTotal()
  itemsInCart += 1
  itemsInCartDisplay.textContent = itemsInCart;
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement('div')
  var cartProducts = document.getElementsByClassName('cart-products')[0]
  var cartRowContents = `
  <div class="cart-item">
    <img src="${imageSrc}" class="cart-item-image">
    <div class="cart-product-info">
      <div class="cart-product-name">${title}</div>
      <div class="cart-product-price">${price}</div>
    </div>
    <button class="delete-cart-item">&#10005;</button>
  </div>`
  cartRow.innerHTML = cartRowContents
  cartProducts.append(cartRow)
  cartRow.getElementsByClassName('delete-cart-item')[0].addEventListener('click', removeCartItem)
}


function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-products')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-item')
  var total = 0
  for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i]
      var priceElement = cartRow.getElementsByClassName('cart-product-price')[0]
      var price = parseFloat(priceElement.innerText.replace('$', ''))
      total = total + price
      console.log(total)
  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

function openCart() {
  mySideBar.style.width = "28%";
  mySideBar.style.opacity = "1";
  myOverlay.style.width = "100%";
}


function closeCart(){
  mySideBar.style.width = "0px";
  mySideBar.style.opacity = "0";
  myOverlay.style.width = "0px";
}