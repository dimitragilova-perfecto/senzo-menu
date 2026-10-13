const pizzas = {
  "Margherita": {
    price: "€12",
    description: "San Marzano tomato, fior di latte mozzarella, fresh basil and extra virgin olive oil.",
    photo: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1200&q=85"
  },
  "Marinara": {
    price: "€7.50",
    description: "A classic Neapolitan pizza with tomato, garlic, oregano and extra virgin olive oil.",
    photo: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=1200&q=85"
  },
  "Diavola": {
    price: "€10.50",
    description: "Tomato, mozzarella and spicy salami with a lively kick.",
    photo: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=1200&q=85"
  },
  "Quattro Formaggi": {
    price: "€11",
    description: "A rich blend of four cheeses, creamy, savoury and full of flavour.",
    photo: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=1200&q=85"
  },
  "Capricciosa": {
    price: "€11",
    description: "Tomato, mozzarella, ham, mushrooms, artichokes and olives.",
    photo: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=85"
  },
  "Napoli": {
    price: "€10.50",
    description: "Tomato, mozzarella, anchovies, capers and olives in a bold southern Italian combination.",
    photo: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1200&q=85"
  },
  "Prosciutto e Funghi": {
    price: "€10.50",
    description: "Tomato, mozzarella, Italian ham and mushrooms.",
    photo: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=1200&q=85"
  },
  "Burrata e Crudo": {
    price: "€14.50",
    description: "Creamy burrata and delicate prosciutto crudo on a freshly baked Neapolitan base.",
    photo: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1200&q=85"
  },
  "Mortadella e Pistacchio": {
    price: "€14",
    description: "Mortadella, pistachio and a creamy cheese finish.",
    photo: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=85"
  },
  "Salsiccia e Friarielli": {
    price: "€13",
    description: "Italian sausage with friarielli greens, inspired by the flavours of Naples.",
    photo: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=1200&q=85"
  },
  "Bosco al Tartufo": {
    price: "€14.50",
    description: "Earthy mushrooms and truffle notes over a rich, savoury base.",
    photo: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=1200&q=85"
  },
  "'Nduja e Burrata": {
    price: "€14",
    description: "Spicy Calabrian 'nduja balanced with cool, creamy burrata.",
    photo: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=1200&q=85"
  },
  "Zucca e Gorgonzola": {
    price: "€12.50",
    description: "Sweet pumpkin and distinctive Gorgonzola for a creamy, autumnal flavour.",
    photo: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=85"
  },
  "Pesto e Stracciatella": {
    price: "€12.50",
    description: "Fresh pesto and delicate stracciatella with fragrant Italian herbs.",
    photo: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1200&q=85"
  }
};

const detailScreen = document.getElementById("pizza-detail");
const detailName = document.getElementById("detail-name");
const detailDescription = document.getElementById("detail-description");
const detailPrice = document.getElementById("detail-price");
const detailPhoto = document.getElementById("detail-photo");
const backButton = document.getElementById("back-button");

function openPizza(name) {
  const pizza = pizzas[name];
  if (!pizza) return;

  detailName.textContent = name;
  detailDescription.textContent = pizza.description;
  detailPrice.textContent = pizza.price;
  detailPhoto.src = pizza.photo;
  detailPhoto.alt = name + " pizza";
  detailScreen.classList.add("is-open");
  detailScreen.setAttribute("aria-hidden", "false");
  document.body.classList.add("detail-open");
  backButton.focus();
}

function closePizza() {
  detailScreen.classList.remove("is-open");
  detailScreen.setAttribute("aria-hidden", "true");
  document.body.classList.remove("detail-open");
}

document.querySelectorAll(".hotspot").forEach((button) => {
  button.addEventListener("click", () => openPizza(button.dataset.pizza));
});

backButton.addEventListener("click", closePizza);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && detailScreen.classList.contains("is-open")) {
    closePizza();
  }
});
