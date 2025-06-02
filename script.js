"use strict";

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const imageThumb = document.querySelector(".slide-thumb");

let curSlide = 0;
const maxSlide = slides.length;
console.log(maxSlide);

const gotoSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

const createDots = function () {
  slides.forEach(function (_, i) {
    imageThumb.insertAdjacentHTML(
      "beforeend",
      `<div class= "product-list">
         <img src = "./images/image-product-${
           i + 1
         }-thumbnail.jpg" class = "slide-thumb__image" data-slide = "${i}"/>
      </div>`
    );
  });
};

const activeImage = function (slide) {
  document
    .querySelectorAll("slide-thumb__image")
    .forEach((thumb) => console.log("let me see"));
};

createDots();
gotoSlide(curSlide);

btnRight.addEventListener("click", () => {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  gotoSlide(curSlide);
});

btnLeft.addEventListener("click", () => {
  if (curSlide === 0) {
    curSlide = 0;
  } else {
    curSlide--;
  }
  gotoSlide(curSlide);
});

//       <div class = "slide-thumb__image active-image"></div>
