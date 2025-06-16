"use strict";

const slides = document.querySelectorAll(".slide");
// const thumbnails = document.querySelectorAll(".thumb");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const imageThumb = document.querySelector(".slide-thumb");

const bodyContainer = document.querySelector(".body");

const increaseCartNum = document.querySelector(".icon-plus");
const decreaseCartNum = document.querySelector(".icon-minus");
const numberOfCart = document.querySelector(".cart-number");
const userNotify = document.querySelector(".user-nav__notification");
const cartCurrentPrice = document.querySelector(".current-price");
const iconCartShow = document.querySelector(".icon-cart");
const cartBox = document.querySelector(".cart--list");
const cartEmpty = document.querySelector(".cart--empty");
const addCartButton = document.querySelector(".cart-btn");
const navBar = document.querySelector(".nav");
const menuOpen = document.querySelector(".menu-open");
const menuClose = document.querySelector(".menu-close");

/*IMAGE SLIDER STARTS HERE */
let curSlide = 0;
const maxSlide = slides.length;
let images = [];

const gotoSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

const openOverlay = function () {
  bodyContainer.insertAdjacentHTML("afterbegin", `<div class="overlay"></div>`);
};

const createDots = function () {
  slides.forEach(function (ev, i) {
    imageThumb.insertAdjacentHTML(
      "beforeend",
      `<div class= "product-list" data-slide = "${i}">
         <img src = "./images/image-product-${
           i + 1
         }-thumbnail.jpg" class = "slide-thumb__image" data-slide = "${i}"/>
      </div>`
    );
    // console.log(thumbnails);
    ev.addEventListener("click", () => {
      const thumbnails = document.querySelectorAll(".slide-thumb__image");
      openOverlay();
      const overlay = document.querySelector(".overlay");
      const imageSrcArray = Array.from(thumbnails).map((img) => img.src);
      console.log(imageSrcArray);
      imageSrcArray.forEach((src, i) => {
        const imageHtml = `<div class= "product-list" data-slide = "${i}">
         <img src = "${src}" class = "slide-thumb__image" data-slide = "${i}"/>
      </div>`;
        overlay.insertAdjacentHTML("beforeend", imageHtml);
        console.log(overlay);
      });
      activeImage(i);
      console.log(i);
    });
  });
};

const activeImage = function (slide) {
  document
    .querySelectorAll(".product-list")
    .forEach((product) => product.classList.remove("active-product"));

  document
    .querySelectorAll(".slide-thumb__image")
    .forEach((image) => image.classList.remove("active-image"));

  document
    .querySelector(`.product-list[data-slide = "${slide}"]`)
    .classList.add("active-product");

  document
    .querySelector(`.slide-thumb__image[data-slide = "${slide}"]`)
    .classList.add("active-image");
};

createDots();
gotoSlide(curSlide);
activeImage(0);

btnRight.addEventListener("click", () => {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  gotoSlide(curSlide);
  activeImage(curSlide);
});

btnLeft.addEventListener("click", () => {
  if (curSlide === 0) {
    curSlide = 0;
  } else {
    curSlide--;
  }
  gotoSlide(curSlide);
  activeImage(curSlide);
});
imageThumb.addEventListener("click", function (e) {
  if (e.target.classList.contains("slide-thumb__image")) {
    const { slide } = e.target.dataset;
    gotoSlide(slide);
    activeImage(slide);
  }
});
/*IMAGE SLIDER ENDS HERE*/

let cartNumberText = 0;
let totalPrice = 125;
let hasRun = false;

addCartButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (cartNumberText > 0) {
    userNotify.style.display = "flex";
    userNotify.textContent = cartNumberText;
    createCarts();
    const cartDetailsNumber = document.querySelector(".cart-times");
    const cartTotalPrice = document.querySelector(".total-price");
    const iconDelete = document.querySelector(".icon-delete");
    const cartDetailsremove = document.querySelector(".cart--details");
    cartDetailsNumber.textContent = cartNumberText;
    cartTotalPrice.textContent = totalPrice * cartNumberText;
    cartDetailsremove.style.display = "flex";

    iconDelete.addEventListener("click", () => {
      cartNumberText = 0;
      userNotify.style.display = "none";
      userNotify.textContent = cartNumberText;
      cartDetailsNumber.textContent = cartNumberText;
      numberOfCart.textContent = cartNumberText;
      cartEmpty.style.display = "block";
      cartDetailsremove.style.display = "none";
    });
  }
});

increaseCartNum.addEventListener("click", () => {
  cartNumberText++;
  numberOfCart.textContent = cartNumberText;
});

decreaseCartNum.addEventListener("click", () => {
  if (cartNumberText > 0) {
    cartNumberText--;
    if (cartNumberText === 0) userNotify.style.display = "none";
    userNotify.textContent = cartNumberText;
  }
  if (cartNumberText <= 0) {
    cartNumberText = 0;
    const cartDetails = document.querySelector(".cart--details");
    hasRun = false;
    cartDetails.remove();
    cartEmpty.style.display = "block";
  }
  numberOfCart.textContent = cartNumberText;
  const cartDetailsNumber = document.querySelector(".cart-times");
  const cartTotalPrice = document.querySelector(".total-price");
  cartDetailsNumber.textContent = cartNumberText;
  cartTotalPrice.textContent = Number(cartTotalPrice.textContent) - totalPrice;
});

iconCartShow.addEventListener("click", () => {
  cartBox.classList.toggle("cart--list-open");
});

const createCarts = function () {
  cartEmpty.style.display = "none";
  if (hasRun) return;
  hasRun = true;

  cartBox.insertAdjacentHTML(
    "beforeend",
    `<div class="cart--details">
        <div class="cart--item">
            <div class="item-thumb">
                <img src = "./images/image-product-${
                  curSlide + 1
                }-thumbnail.jpg" class = "slide-thumb__image"/>
            </div>
            <div class="cart--item-info">
                <p class="cart-narration">Fall Limited Edition Sneakers</p>
                <div class="cart-price-times">
                    <p class="u-margin-left u-cart-details-price price">${
                      cartCurrentPrice.textContent
                    }</p>
                    <span class="u-margin-left u-cart-details-price times"> x </span>
                    <p class ="u-margin-left  u-cart-details-price cart-times"> 0 </p>
                    <p class= "cart-total-price"> $<span class="total-price">0</span> </p>
                </div>  
            </div>
            <div class="cart-icon-delete">
                <img src = "./images/icon-delete.svg" class= "icon-delete"/>
            </div>
        </div>
        <div class="cart-checkout">
            <a href="#">Checkout</a>
        </div>
    </div>`
  );
};

menuOpen.addEventListener("click", () => {
  openOverlay();
  navBar.classList.add("nav--open");
});

menuClose.addEventListener("click", () => {
  const overlay = document.querySelector(".overlay");
  if (overlay) {
    overlay.remove();
    navBar.classList.remove("nav--open");
  }
});

// thumbnails.forEach((thumb, index) => {
//   images.push(thumb.src);
//   thumb.addEventListener("click", () => {
//     openOverlay();
//     curSlide = index;
//     const overlay = document.querySelector(".overlay");
//     overlay.insertAdjacentHTML(
//       "beforeend",
//       `<div><img class="lightbox-img" src=""></div>`
//     );
//     console.log(overlay);
//     showLightbox(images[curSlide]);
//   });
// });

const showLightbox = function (src) {
  const lightboxImg = document.querySelector(".lightbox-img");
  lightboxImg.src = src;
  createDots();
};
