document
  .getElementById("header-logo")
  .addEventListener("click", () => pageRedirect("index.html"));

const pageRedirect = (url) => {
  window.location.href = url;
};

const displayAlert = (message) => {
  alert(message);
};

document.querySelectorAll(".galleryDirect").forEach((button) => {
  button.addEventListener("click", () => pageRedirect("gallery.html"));
});

document
  .getElementById("newsletterForm")
  ?.addEventListener("submit", (event) => {
    displayAlert("Thank you for subscribing.");
  });

document
  .getElementById("contactusform")
  ?.addEventListener("submit", (event) => {
    const formName = document.getElementById("formName").value;
    const formTel = document.getElementById("formTel").value;
    const formEmail = document.getElementById("formEmail").value;
    const formSelect = document.getElementById("formSelect").value;
    const formFeedbackText = document.getElementById("formFeedbackText").value;

    const storeForm = {
      name: formName,
      phone: formTel,
      email: formEmail,
      commReason: formSelect,
      feedback: formFeedbackText,
    };

    const key = formName;

    sessionStorage.setItem(key, JSON.stringify(storeForm));
    displayAlert(`Thank you for your ${formSelect}, ${formName}!`);
  });

const cart = document.getElementById("cart-table");
let itemsInCart = new Map();

function createCartItem(keyItem, valueQty) {
  const newCartItem = document.createElement("div");
  newCartItem.id = `div-${keyItem}`;
  newCartItem.className = "cart-item border";
  newCartItem.innerHTML = `<div><p data-item="${keyItem}">${keyItem}</p>
  <p><button class="decreaseQty" data-item="${keyItem}" onclick="decreaseQtyFunc('${keyItem}')">-</button> (<span id="qty-${keyItem}">${valueQty}</span>) <button class="increaseQty" data-item="${keyItem}" onclick="increaseQtyFunc('${keyItem}')">+</button></p></div>`;
  cart.appendChild(newCartItem);
}

document.querySelectorAll(".addItem").forEach((button) => {
  button.addEventListener("click", function () {
    const keyItem = this.dataset.item;

    if (cart.innerHTML == '<p class="center-text">Cart is empty</p>') {
      cart.innerHTML = "";
    }

    if (localStorage.getItem(keyItem)) {
      increaseQtyFunc(keyItem);

      console.log("String found!");
      console.log(keyItem);
    } else {
      console.log("String not found.");
      console.log(keyItem);

      localStorage.setItem(keyItem, 1);
      createCartItem(keyItem, 1);
    }

    displayAlert(`Item added to cart: ${keyItem}`);
  });
});

function clearCart() {
  cart.innerHTML = '<p class="center-text">Cart is empty</p>';
  localStorage.clear();
}

document.getElementById("clear-cart-button")?.addEventListener("click", () => {
  if (cart.innerHTML != '<p class="center-text">Cart is empty</p>') {
    clearCart();
    displayAlert("Cart Cleared");
  } else {
    displayAlert("No items to clear");
  }
});

document
  .getElementById("process-order-button")
  ?.addEventListener("click", () => {
    if (cart.innerHTML != '<p class="center-text">Cart is empty</p>') {
      clearCart();
      displayAlert("Thank you for your order!");
    } else {
      displayAlert("Cart is empty.");
    }
  });

function decreaseQtyFunc(keyItem) {
  console.log(keyItem);
  const nStored = localStorage.getItem(keyItem);

  if (nStored > 1) {
    console.log("qty decreased");
    const nNew = nStored - 1;
    localStorage.setItem(keyItem, nNew);
    document.getElementById(`qty-${keyItem}`).innerHTML = nNew;
  } else {
    document.getElementById(`div-${keyItem}`).remove();
    localStorage.removeItem(keyItem);

    if (localStorage.length == 0) {
      cart.innerHTML = '<p class="center-text">Cart is empty</p>';
    }
  }
}

function increaseQtyFunc(keyItem) {
  console.log(keyItem);
  console.log("qty increased");

  const nNew = Number(localStorage.getItem(keyItem)) + 1;
  localStorage.setItem(keyItem, nNew);
  document.getElementById(`qty-${keyItem}`).innerHTML = nNew;
}

while (localStorage.length > itemsInCart.size) {
  const keys = Object.keys(localStorage);
  keys.forEach((key) => {
    const value = localStorage.getItem(key);
    createCartItem(key, value);
    itemsInCart.set(key, value);
  });
}

if (itemsInCart.size == 0) {
  cart.innerHTML = '<p class="center-text">Cart is empty</p>';
}
