let slidePosition = 0;
const slides = document.querySelectorAll(".carousel_item");
const totalSlides = slides.length;

let next = document.querySelector("#carousel_button--next");

let prev = document.querySelector("#carousel_button--prev");

next.addEventListener("click", () => {
  prev.classList.remove("lastclick")
  next.classList.add("lastclick")
  moveToNextSlide();
});
prev.addEventListener("click", () => {
  prev.classList.add("lastclick")
  next.classList.remove("lastclick")
  moveToPrevSlide();
});

function updateSlidePosition() {
    console.log("start")
  for (let slide of slides) {
    slide.classList.remove("carousel_item--visible");
    slide.classList.add("carousel_item--hidden");
  }

  slides[slidePosition].classList.add("carousel_item--visible");
}
function moveToNextSlide() {
  console.log("next");
  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  } else {
    slidePosition++;
  }
  updateSlidePosition();
}
function moveToPrevSlide() {
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition--;
  }
  updateSlidePosition();
}
