/* =========================================
   SENZO DIGITAL MENU
   PAGE DATA
========================================= */


const pages = [

  {
    image: "menu-food.jpg",
    alt: "SENZO food menu"
  },

  {
    image: "menu-drinks.jpg",
    alt: "SENZO drinks menu"
  },

  {
    image: "menu-desserts.jpg",
    alt: "SENZO desserts menu"
  }

];



/* =========================================
   CURRENT PAGE
========================================= */


let currentPage = 0;



/* =========================================
   TOUCH / SWIPE
========================================= */


let touchStartX = 0;

let touchStartY = 0;



/* =========================================
   ELEMENTS
========================================= */


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



/* =========================================
   SHOW PAGE
========================================= */


function showPage(direction = 1) {


  /*
    Remove previous animation
  */

  page.classList.remove(
    "turn-next",
    "turn-prev"
  );


  /*
    Force browser to restart animation
  */

  void page.offsetWidth;


  /*
    Add correct direction
  */

  if (direction > 0) {

    page.classList.add("turn-next");

  } else {

    page.classList.add("turn-prev");

  }


  /*
    Change image
  */

  menuImage.src =
    pages[currentPage].image;


  menuImage.alt =
    pages[currentPage].alt;


  /*
    Page number
  */

  pageNumber.textContent =

    String(currentPage + 1)
      .padStart(2, "0")

    + " / " +

    String(pages.length)
      .padStart(2, "0");


  /*
    Active dot
  */

  dots.forEach(
    (dot, index) => {

      dot.classList.toggle(
        "active",
        index === currentPage
      );

    }
  );


  /*
    Disable arrows at beginning/end
  */

  previousButton.disabled =
    currentPage === 0;


  nextButton.disabled =
    currentPage === pages.length - 1;


  /*
    Mobile instruction
  */

  if (window.innerWidth <= 700) {

    hint.textContent =
      "SWIPE OR TAP THE ARROWS";

  } else {

    hint.textContent =
      "USE THE ARROWS TO TURN THE MENU";

  }

}



/* =========================================
   NEXT PAGE
========================================= */


function nextPage() {


  if (
    currentPage <
    pages.length - 1
  ) {

    currentPage++;

    showPage(1);

  }

}



/* =========================================
   PREVIOUS PAGE
========================================= */


function previousPage() {


  if (
    currentPage > 0
  ) {

    currentPage--;

    showPage(-1);

  }

}



/* =========================================
   ARROW BUTTONS
========================================= */


nextButton.addEventListener(
  "click",
  nextPage
);


previousButton.addEventListener(
  "click",
  previousPage
);



/* =========================================
   DOT NAVIGATION
========================================= */


dots.forEach(
  (dot) => {

    dot.addEventListener(
      "click",
      () => {

        const targetPage =
          Number(
            dot.dataset.page
          );


        if (
          targetPage ===
          currentPage
        ) {

          return;

        }


        const direction =
          targetPage >
          currentPage
            ? 1
            : -1;


        currentPage =
          targetPage;


        showPage(direction);

      }
    );

  }
);



/* =========================================
   KEYBOARD
========================================= */


document.addEventListener(
  "keydown",
  (event) => {


    if (
      event.key === "ArrowRight"
    ) {

      nextPage();

    }


    if (
      event.key === "ArrowLeft"
    ) {

      previousPage();

    }

  }
);



/* =========================================
   TOUCH START
========================================= */


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

  {
    passive: true
  }

);



/* =========================================
   TOUCH END
========================================= */


bookStage.addEventListener(

  "touchend",

  (event) => {


    const touch =
      event.changedTouches[0];


    const differenceX =
      touch.clientX -
      touchStartX;


    const differenceY =
      touch.clientY -
      touchStartY;


    /*
      Ignore vertical scrolling
    */

    if (
      Math.abs(differenceX) <
      45
    ) {

      return;

    }


    if (
      Math.abs(differenceX) <
      Math.abs(differenceY)
    ) {

      return;

    }


    /*
      Swipe left = next
    */

    if (
      differenceX < 0
    ) {

      nextPage();

    }


    /*
      Swipe right = previous
    */

    else {

      previousPage();

    }

  },

  {
    passive: true
  }

);



/* =========================================
   INITIALIZE
========================================= */


showPage(1);
