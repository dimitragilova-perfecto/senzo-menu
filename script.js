// ==========================================
// SENZO DIGITAL MENU
// Original menu + interactive pizza details
// ==========================================

const pages = [
  {
    image: "https://raw.githubusercontent.com/dimitragilova-perfecto/senzo-menu/main/foods.jpeg",
    alt: "SENZO food menu"
  },
  {
    image: "https://raw.githubusercontent.com/dimitragilova-perfecto/senzo-menu/main/drinks.jpeg",
    alt: "SENZO drinks menu"
  },
  {
    image: "https://raw.githubusercontent.com/dimitragilova-perfecto/senzo-menu/main/deserts.jpeg",
    alt: "SENZO desserts menu"
  },
    {
    image: "https://raw.githubusercontent.com/dimitragilova-perfecto/senzo-menu/main/wine.jpeg",
    alt: "SENZO wine menu"
  }
];

let currentPage = 0;
let touchStartX = 0;
let touchStartY = 0;

const page = document.getElementById("page");
const menuImage = document.getElementById("menuImage");
const previousButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const pageNumber = document.getElementById("pageNumber");
const dots = document.querySelectorAll(".dot");
const bookStage = document.getElementById("bookStage");
const hint = document.getElementById("hint");


// ==========================================
// PIZZA INFORMATION
// Image files must be uploaded to repository root
// ==========================================

const foodDetails = {
  margherita: {
    name: "Margherita",
    image: "https://raw.githubusercontent.com/dimitragilova-perfecto/senzo-menu/main/margherita.png",
    description:
      "San Marzano tomato sauce, Fior di Latte mozzarella, fresh basil and extra virgin olive oil.",
    price: "€7.50"
  },

  marinara: {
    name: "Marinara",
    image: "https://raw.githubusercontent.com/dimitragilova-perfecto/senzo-menu/main/marinara.png",
    description:
      "San Marzano tomato sauce, garlic, oregano and extra virgin olive oil. No cheese.",
    price: "€7.50"
  },

  diavola: {
    name: "Diavola",
    image: "https://raw.githubusercontent.com/dimitragilova-perfecto/senzo-menu/main/diavola.png",
    description:
      "Tomato sauce, Fior di Latte mozzarella, spicy Italian salami, oregano and olive oil.",
    price: "€10.50"
  },

  quattro: {
    name: "Quattro Formaggi",
    image: "https://raw.githubusercontent.com/dimitragilova-perfecto/senzo-menu/main/quattro-formaggi.png",
    description:
      "Fior di Latte, Gorgonzola, Taleggio and Parmigiano Reggiano.",
    price: "€11.00"
  },

  capricciosa: {
    name: "Capricciosa",
    image: "https://raw.githubusercontent.com/dimitragilova-perfecto/senzo-menu/main/capricciosa.png",
    description:
      "Tomato sauce, mozzarella, cooked ham, mushrooms, artichokes and olives.",
    price: "€11.00"
  },

  napoli: {
    name: "Napoli",
    image: "https://raw.githubusercontent.com/dimitragilova-perfecto/senzo-menu/main/napoli.png",
    description:
      "Tomato sauce, mozzarella, anchovies, capers, olives and oregano.",
    price: "€10.50"
  },

  prosciutto: {
    name: "Prosciutto e Funghi",
    image: "https://raw.githubusercontent.com/dimitragilova-perfecto/senzo-menu/main/prosciutto-funghi.png",
    description:
      "Tomato sauce, Fior di Latte mozzarella, cooked ham and mushrooms.",
    price: "€10.50"
  }
};


// ==========================================
// CREATE THE FOOD POPUP
// No separate HTML changes needed
// ==========================================

const modal = document.createElement("div");

modal.id = "foodModal";
modal.innerHTML = `
  <div class="senzo-modal-content" role="dialog"
       aria-modal="true" aria-labelledby="foodModalTitle">

    <button class="senzo-modal-close"
            id="closeFoodModal"
            aria-label="Close">&times;</button>

    <img id="foodModalImage" src="" alt="">

    <div class="senzo-modal-info">
      <p class="senzo-modal-label">
        SENZO · NEAPOLITAN PIZZERIA
      </p>

      <h2 id="foodModalTitle"></h2>

      <p id="foodModalDescription"></p>

      <p id="foodModalPrice"></p>
    </div>

  </div>
`;

document.body.appendChild(modal);


// ==========================================
// POPUP DESIGN
// ==========================================

const modalStyle = document.createElement("style");

modalStyle.textContent = `
  #foodModal {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 9999;

    align-items: center;
    justify-content: center;

    padding: 18px;
    box-sizing: border-box;

    background: rgba(30, 18, 15, 0.84);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }

  #foodModal.open {
    display: flex;
  }

  .senzo-modal-content {
    position: relative;

    width: min(860px, 100%);
    max-height: 90vh;

    display: grid;
    grid-template-columns: 1fr 1fr;

    overflow: auto;

    background: #f3e8d6;
    color: #702635;

    border: 1px solid rgba(112, 38, 53, 0.35);
    box-shadow: 0 20px 70px rgba(0, 0, 0, 0.4);
  }

  #foodModalImage {
    display: block;
    width: 100%;
    height: 100%;
    min-height: 350px;

    object-fit: cover;
  }

  .senzo-modal-info {
    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 36px;
    box-sizing: border-box;
  }

  .senzo-modal-label {
    font-family: Georgia, serif;
    font-size: 10px;
    letter-spacing: 0.18em;
    line-height: 1.8;
  }

  .senzo-modal-info h2 {
    margin: 14px 0;

    font-family: Georgia, serif;
    font-size: clamp(25px, 4vw, 38px);
    font-weight: normal;
  }

  #foodModalDescription {
    font-family: Georgia, serif;
    font-size: 15px;
    line-height: 1.8;
  }

  #foodModalPrice {
    margin-top: 20px;

    font-family: Georgia, serif;
    font-size: 24px;
  }

  .senzo-modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 2;

    width: 40px;
    height: 40px;

    border: 1px solid rgba(112, 38, 53, 0.3);
    border-radius: 50%;

    background: #f3e8d6;
    color: #702635;

    font-size: 28px;
    line-height: 1;

    cursor: pointer;
  }

  .senzo-modal-close:hover {
    background: #702635;
    color: #f3e8d6;
  }

  /* Invisible clickable areas over the pizza names */

  #pizzaHotspots {
    position: absolute;
    inset: 0;
    z-index: 5;

    pointer-events: none;
  }

  .pizza-hotspot {
    position: absolute;
    left: 49%;
    width: 47%;
    height: max(3.1%, 20px);
    transform: translateY(-50%);

    padding: 0;
    border: 0;
    background: transparent;

    cursor: pointer;
    pointer-events: auto;
    touch-action: manipulation;
  }

  .pizza-hotspot:focus-visible {
    outline: 2px dashed #702635;
    outline-offset: 1px;
  }

  @media (max-width: 600px) {
    #foodModal {
      padding: 12px;
    }

    .senzo-modal-content {
      grid-template-columns: 1fr;
      width: min(420px, 100%);
      max-height: 88vh;
    }

    #foodModalImage {
      height: 260px;
      min-height: 0;
      max-height: 36vh;
    }

    .senzo-modal-info {
      padding: 20px 24px 24px;
    }

    .senzo-modal-info h2 {
      margin: 8px 0;
    }

    #foodModalDescription {
      font-size: 14px;
      line-height: 1.65;
    }

    #foodModalPrice {
      margin-top: 12px;
    }
  }
`;

document.head.appendChild(modalStyle);


// ==========================================
// CREATE INVISIBLE BUTTONS OVER PIZZA NAMES
// Positions are approximate and may need tuning
// ==========================================

const hotspotLayer = document.createElement("div");
hotspotLayer.id = "pizzaHotspots";
hotspotLayer.setAttribute("aria-label", "Interactive pizza menu");

page.style.position = "relative";
page.appendChild(hotspotLayer);

const pizzaPositions = [
  { key: "margherita", top: 21.4 },
  { key: "marinara", top: 25.0 },
  { key: "diavola", top: 28.6 },
  { key: "quattro", top: 31.8 },
  { key: "capricciosa", top: 34.8 },
  { key: "napoli", top: 37.7 },
  { key: "prosciutto", top: 40.4 }
];

pizzaPositions.forEach(item => {
  const button = document.createElement("button");

  button.type = "button";
  button.className = "pizza-hotspot";
  button.style.top = item.top + "%";
  button.setAttribute(
    "aria-label",
    "View " + foodDetails[item.key].name
  );

  button.addEventListener("click", () => {
    openFoodModal(item.key);
  });

  hotspotLayer.appendChild(button);
});


// ==========================================
// OPEN AND CLOSE FOOD DETAILS
// ==========================================

const foodModalImage = modal.querySelector("#foodModalImage");
const foodModalTitle = modal.querySelector("#foodModalTitle");
const foodModalDescription =
  modal.querySelector("#foodModalDescription");
const foodModalPrice = modal.querySelector("#foodModalPrice");

function openFoodModal(foodKey) {
  const food = foodDetails[foodKey];

  if (!food) return;

  foodModalImage.src = food.image;
  foodModalImage.alt = food.name;

  foodModalTitle.textContent = food.name;
  foodModalDescription.textContent = food.description;
  foodModalPrice.textContent = food.price;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}

function closeFoodModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}

modal.querySelector("#closeFoodModal")
  .addEventListener("click", closeFoodModal);

modal.addEventListener("click", event => {
  if (event.target === modal) {
    closeFoodModal();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    closeFoodModal();
  }
});


// ==========================================
// DIGITAL BOOK NAVIGATION
// ==========================================

function showPage(direction = 1) {
  page.classList.remove("turn-next", "turn-prev");
  void page.offsetWidth;

  page.classList.add(
    direction > 0 ? "turn-next" : "turn-prev"
  );

  menuImage.src = pages[currentPage].image;
  menuImage.alt = pages[currentPage].alt;

  // Pizza hotspots work only on the food menu.
  hotspotLayer.style.display = currentPage === 0 ? "block" : "none";

  pageNumber.textContent =
    String(currentPage + 1).padStart(2, "0") +
    " / " +
    String(pages.length).padStart(2, "0");

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentPage);
  });

  previousButton.disabled = currentPage === 0;
  nextButton.disabled = currentPage === pages.length - 1;

  hint.textContent = window.innerWidth <= 700
    ? "SWIPE OR TAP THE ARROWS"
    : "USE THE ARROWS TO TURN THE MENU";
}

function nextPage() {
  if (currentPage < pages.length - 1) {
    currentPage++;
    showPage(1);
  }
}

function previousPage() {
  if (currentPage > 0) {
    currentPage--;
    showPage(-1);
  }
}

nextButton.addEventListener("click", nextPage);
previousButton.addEventListener("click", previousPage);

dots.forEach(dot => {
  dot.addEventListener("click", () => {
    const target = Number(dot.dataset.page);

    if (target === currentPage) return;

    const direction = target > currentPage ? 1 : -1;

    currentPage = target;
    showPage(direction);
  });
});

document.addEventListener("keydown", event => {
  if (modal.classList.contains("open")) return;

  if (event.key === "ArrowRight") nextPage();
  if (event.key === "ArrowLeft") previousPage();
});


// ==========================================
// MOBILE SWIPE
// ==========================================

bookStage.addEventListener("touchstart", event => {
  const touch = event.changedTouches[0];

  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}, { passive: true });

bookStage.addEventListener("touchend", event => {
  if (modal.classList.contains("open")) return;

  const touch = event.changedTouches[0];

  const differenceX = touch.clientX - touchStartX;
  const differenceY = touch.clientY - touchStartY;

  if (Math.abs(differenceX) < 45) return;
  if (Math.abs(differenceX) < Math.abs(differenceY)) return;

  if (differenceX < 0) {
    nextPage();
  } else {
    previousPage();
  }
}, { passive: true });


// ==========================================
// START
// ==========================================

showPage(1);
