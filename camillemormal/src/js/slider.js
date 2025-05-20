import gsap from "gsap"; // Reference to canvas and its context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;
// Array of image sources
const imageSources = [
  "./img/01.jpeg",
  "./img/02.jpeg",
  "./img/03.jpeg",
  "./img/04.jpeg",
];
const images = []; // Array to store preloaded images
let currentIndex = 0; // Track the currently selected image
const imageWidth = 400;
const imageHeight = 400;

// Function to preload all images
function preloadImages(sources, callback) {
  let loadedCount = 0;

  sources.forEach((src, index) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      loadedCount++;
      images[index] = img; // Store the image in the correct order
      if (loadedCount === sources.length) {
        callback(); // Execute callback when all images are loaded
      }
    };
  });
}

// Function to draw the current image
function drawImage(index) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    images[index],
    canvas.width / 2 - imageWidth / 2,
    canvas.height / 2 - imageHeight / 2,
    imageWidth,
    imageHeight
  );
}

// Function to handle sliding animation
function slideImage(fromIndex, toIndex, direction) {
  const imgFrom = images[fromIndex];
  const imgTo = images[toIndex];
  const startX = direction === "left" ? 0 : canvas.width;
  const endX = direction === "left" ? canvas.width  : 0;

  gsap.to(
    { x: startX },
    {
      x: endX,
      duration: 0.5,
      ease: "power2.inOut",
      onUpdate: function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the outgoing image sliding out
        ctx.drawImage(
          imgFrom,
          // this.targets()[0].x + 200 - imageWidth / 2,
          this.targets()[0].x ,
          canvas.height / 2 - imageHeight / 2,
          imageWidth,
          imageHeight
        );

        // // Draw the incoming image sliding in
        ctx.drawImage(
          imgTo,
          this.targets()[0].x - canvas.width,
          canvas.height / 2 - imageHeight / 2,
          imageWidth,
          imageHeight
        );
      },
      onComplete: () => {
        currentIndex = toIndex; // Update the current index when animation completes
      },
    }
  );
}

// Event listeners for buttons
document.getElementById("prevBtn").addEventListener("click", () => {
  const previousIndex = (currentIndex - 1 + images.length) % images.length;
  slideImage(currentIndex, previousIndex, "right");

});

document.getElementById("nextBtn").addEventListener("click", () => {
  const nextIndex = (currentIndex + 1) % images.length;
  slideImage(currentIndex, nextIndex, "left");
});

// Start the application
preloadImages(imageSources, () => {
  // Once all images are loaded, draw the first image
  drawImage(currentIndex);
});
