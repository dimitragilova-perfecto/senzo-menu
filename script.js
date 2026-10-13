const pages = [

  {
    image: "foods.jpeg",
    alt: "SENZO food menu"
  },

  {
    image: "drinks.jpeg",
    alt: "SENZO drinks menu"
  },

  {
    image: "desserts.jpeg",
    alt: "SENZO desserts menu"
  }

];


let currentPage = 0;

let touchStartX = 0;
let touchStartY = 0;


const page =
  document.getElementById("page");

const menuImage =
  document.getElementById("menuImage");

const previousButton =
  document.getElementById("prev");

const nextButton =
  document.getElementById("next");

const pageNumber =
  document.getElementById("pageNumber");

const dots =
  document.querySelectorAll(".dot");

const bookStage =
  document.getElementById("bookStage");

const hint =
  document.getElementById("hint");


function showPage(direction = 1) {

  page.classList.remove(
    "turn-next",
    "turn-prev"
  );

  void page.offsetWidth;

  if (direction > 0) {

    page.classList.add("turn-next");

  } else {

    page.classList.add("turn-prev");

  }


  menuImage.src =
    pages[currentPage].image;

  menuImage.alt =
    pages[currentPage].alt;


  pageNumber.textContent =
    String(currentPage + 1).padStart(2, "0")
    + " / "
    + String(pages.length).padStart(2, "0");


  dots.forEach((dot, index) => {

    dot.classList.toggle(
      "active",
      index === currentPage
    );

  });


  previousButton.disabled =
    currentPage === 0;

  nextButton.disabled =
    currentPage === pages.length - 1;


  if (window.innerWidth <= 700) {

    hint.textContent =
      "SWIPE OR TAP THE ARROWS";

  } else {

    hint.textContent =
      "USE THE ARROWS TO TURN THE MENU";

  }

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


nextButton.addEventListener(
  "click",
  nextPage
);


previousButton.addEventListener(
  "click",
  previousPage
);


dots.forEach((dot) => {

  dot.addEventListener(
    "click",
    () => {

      const targetPage =
        Number(dot.dataset.page);

      if (targetPage === currentPage) {
        return;
      }

      const direction =
        targetPage > currentPage
          ? 1
          : -1;

      currentPage = targetPage;

      showPage(direction);

    }
  );

});


document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "ArrowRight") {
      nextPage();
    }

    if (event.key === "ArrowLeft") {
      previousPage();
    }

  }
);


bookStage.addEventListener(
  "touchstart",
  (event) => {

    const touch =
      event.changedTouches[0];

    touchStartX =
      touch.clientX;

    touchStartY =
      touch.clientY;

  },
  { passive: true }
);


bookStage.addEventListener(
  "touchend",
  (event) => {

    const touch =
      event.changedTouches[0];

    const differenceX =
      touch.clientX - touchStartX;

    const differenceY =
      touch.clientY - touchStartY;


    if (Math.abs(differenceX) < 45) {
      return;
    }

    if (
      Math.abs(differenceX) <
      Math.abs(differenceY)
    ) {
      return;
    }


    if (differenceX < 0) {

      nextPage();

    } else {

      previousPage();

    }

  },
  { passive: true }
);


showPage(1);
