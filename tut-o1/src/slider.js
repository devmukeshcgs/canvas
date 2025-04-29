import { gsap } from 'gsap';
let canvas;

// Reference to canvas and its context
canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

// Array of image numbers
const array = [
  "./img/01.jpeg",
  "./img/02.jpeg",
  "./img/03.jpeg",
  "./img/04.jpeg",
];
let currentIndex = 0; // Track the currently selected image
const imageWidth = canvas.width/2;
const imageHeight = canvas.height/2;

// Function to display the image with a slide animation
function slideImage(fromIndex, toIndex, direction) {
  const imgFrom = new Image();
  const imgTo = new Image();
  imgFrom.src = array[fromIndex];
  imgTo.src = array[toIndex];

  let x = direction === "left" ? canvas.width / 2 : -canvas.width / 2;

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw outgoing image
    ctx.drawImage(
      imgFrom,
      x - canvas.width / 2,
      canvas.height / 2 - imageHeight / 2,
      imageWidth,
      imageHeight
    );

    // Draw incoming image
    ctx.drawImage(
      imgTo,
      x,
      canvas.height / 2 - imageHeight / 2,
      imageWidth,
      imageHeight
    );

    // Adjust position
    if (direction === "left") {
      x -= 10;
      if (x <= 0) {
        x = 0;
      }
    } else {
      x += 10;
      if (x >= 0) {
        x = 0;
      }
    }

    if (x !== 0) {
      requestAnimationFrame(animate); // Continue animation
    } else {
      currentIndex = toIndex; // Update the current index when animation completes
    }
  };

  imgFrom.onload = () => (imgTo.onload = animate);
}

// Event listeners for buttons
document.getElementById("prevBtn").addEventListener("click", () => {
  const previousIndex = (currentIndex - 1 + array.length) % array.length;
  slideImage(currentIndex, previousIndex, "right");
});

document.getElementById("nextBtn").addEventListener("click", () => {
  const nextIndex = (currentIndex + 1) % array.length;
  slideImage(currentIndex, nextIndex, "left");
});

// Initial display
function displayInitialImage() {
  const img = new Image();
  img.src = array[currentIndex];
  img.onload = () => {
    ctx.drawImage(
      img,
      canvas.width / 2 - imageWidth / 2,
      canvas.height / 2 - imageHeight / 2,
      imageWidth,
      imageHeight
    );
  };
}
displayInitialImage();
