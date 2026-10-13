/* =========================
   CATEGORY NAVIGATION
========================= */

const categoryButtons =
  document.querySelectorAll(".category-button");

const menuPages =
  document.querySelectorAll(".menu-page");


categoryButtons.forEach(button => {

  button.addEventListener("click", () => {

    const category =
      button.dataset.category;


    /* Remove active */

    categoryButtons.forEach(btn => {

      btn.classList.remove("active");

    });


    /* Activate clicked */

    button.classList.add("active");


    /* Hide every page */

    menuPages.forEach(page => {

      page.classList.remove("active-page");

    });


    /* Show selected */

    document
      .getElementById(category)
      .classList.add("active-page");

  });

});



/* =========================
   PIZZA DATA
========================= */

const pizzas = {

  "Margherita": {

    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1000&q=90",

    description:
      "San Marzano tomatoes, fior di latte mozzarella, fresh basil and extra virgin olive oil.",

    price:
      "€12"

  },


  "Marinara": {

    image:
      "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=1000&q=90",

    description:
      "San Marzano tomato, garlic, oregano and extra virgin olive oil.",

    price:
      "€7.50"

  },


  "Diavola": {

    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=1000&q=90",

    description:
      "Tomato, mozzarella and spicy Italian salami.",

    price:
      "€10.50"

  },


  "Quattro Formaggi": {

    image:
      "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=1000&q=90",

    description:
      "A rich combination of four Italian cheeses.",

    price:
      "€11"

  },


  "Capricciosa": {

    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=90",

    description:
      "Tomato, mozzarella, ham, mushrooms, artichokes and olives.",

    price:
      "€11"

  },


  "Napoli": {

    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1000&q=90",

    description:
      "Tomato, mozzarella, anchovies, capers and olives.",

    price:
      "€10.50"

  },


  "Prosciutto e Funghi": {

    image:
      "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=1000&q=90",

    description:
      "Tomato, mozzarella, Italian ham and mushrooms.",

    price:
      "€10.50"

  },


  "Burrata e Crudo": {

    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1000&q=90",

    description:
      "Creamy burrata and delicate prosciutto crudo.",

    price:
      "€14.50"

  },


  "Mortadella e Pistacchio": {

    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=90",

    description:
      "Italian mortadella, pistachio and creamy cheese.",

    price:
      "€14"

  },


  "Salsiccia e Friarielli": {

    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=1000&q=90",

    description:
      "Italian sausage and traditional friarielli greens.",

    price:
      "€13"

  },


  "Bosco al Tartufo": {

    image:
      "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=1000&q=90",

    description:
      "Mushrooms and fragrant Italian truffle.",

    price:
      "€14.50"

  },


  "'Nduja e Burrata": {

    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=1000&q=90",

    description:
      "Spicy Calabrian 'nduja balanced with creamy burrata.",

    price:
      "€14"

  },


  "Zucca e Gorgonzola": {

    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=90",

    description:
      "Sweet pumpkin and bold Gorgonzola.",

    price:
      "€12.50"

  },


  "Pesto e Stracciatella": {

    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1000&q=90",

    description:
      "Fresh pesto and delicate stracciatella.",

    price:
      "€12.50"

  }

};



/* =========================
   PIZZA DETAIL
========================= */

const pizzaButtons =
  document.querySelectorAll(".pizza-dish");


const detail =
  document.getElementById("pizza-detail");


const closeDetail =
  document.getElementById("close-detail");


const detailName =
  document.getElementById("detail-name");


const detailImage =
  document.getElementById("detail-image");


const detailDescription =
  document.getElementById("detail-description");


const detailPrice =
  document.getElementById("detail-price");



pizzaButtons.forEach(button => {

  button.addEventListener("click", () => {

    const pizzaName =
      button.dataset.pizza;


    const pizza =
      pizzas[pizzaName];


    if (!pizza) return;


    detailName.textContent =
      pizzaName;


    detailImage.src =
      pizza.image;


    detailImage.alt =
      pizzaName;


    detailDescription.textContent =
      pizza.description;


    detailPrice.textContent =
      pizza.price;


    detail.classList.add("open");


    document.body.style.overflow =
      "hidden";

  });

});



/* =========================
   CLOSE DETAIL
========================= */

closeDetail.addEventListener("click", () => {

  detail.classList.remove("open");

  document.body.style.overflow =
    "";

});


/* ESC KEY */

document.addEventListener("keydown", event => {

  if (
    event.key === "Escape" &&
    detail.classList.contains("open")
  ) {

    detail.classList.remove("open");

    document.body.style.overflow =
      "";

  }

});
