let cart = {};

function addToCart(itemName, price) {
    if (cart[itemName]) {
        cart[itemName].quantity += 1;
    } else {
        cart[itemName] = {
            price: price,
            quantity: 1
        };
    }
    updateCartDisplay();
}

function removeFromCart(itemName) {
    if (cart[itemName]) {
        cart[itemName].quantity -= 1;
        if (cart[itemName].quantity <= 0) {
            delete cart[itemName];
        }
    }
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartList = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total');
    cartList.innerHTML = '';
    let total = 0;

    for (const item in cart) {
        const { price, quantity } = cart[item];
        const li = document.createElement('li');
        li.innerHTML = `
            ${item} - ₹${price} x ${quantity} = ₹${price * quantity}
            <button onclick="removeFromCart('${item}')">Remove</button>
        `;
        cartList.appendChild(li);
        total += price * quantity;
    }

    totalDisplay.textContent = `Total: ₹${total}`;
}

function checkout() {
  if (Object.keys(cart).length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const summary = {
    items: [],
    total: 0
  };

  for (const item in cart) {
    summary.items.push({
      name: item,
      price: cart[item].price,
      quantity: cart[item].quantity,
      total: cart[item].price * cart[item].quantity
    });
    summary.total += cart[item].price * cart[item].quantity;
  }

  // Store summary in localStorage and redirect
  localStorage.setItem("orderSummary", JSON.stringify(summary));
  window.location.href = "summary.html";
}

