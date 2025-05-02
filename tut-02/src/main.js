// import "./style.css";

let canvas, ctx;
let images = [
  "./img/01.jpeg",
  "./img/02.jpeg",
  "./img/03.jpeg",
  "./img/04.jpeg",
];
let imgArray = [];

window.onload = function () {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = 400;
  canvas.height = 400;

  // Coordinates for drawing images
  let x = 0;
  const y = 0;
  let currentIndex = 0; // Track the currently selected image


  // // Loop through the array
  // images.forEach((item, i) => {
  //   const img = new Image(); // Create a new Image object
  //   img.src = images[i]; // Set the image source dynamically
  //   img.onload = () => {
  //     ctx.drawImage(
  //       img,
  //       canvas.width / 2 - 50,
  //       canvas.height / 2 - 50,
  //       canvas.width,
  //       canvas.height
  //     ); // Draw the image on the canvas
  //     x += 100; // Adjust x-coordinate for the next image
  //   };
  // });
  function displayImage(i) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    const img = new Image(); // Create a new Image object
    img.src = images[i]; // Set the image source
    img.onload = () => {
        ctx.drawImage(img, canvas.width / 2 - 50, canvas.height / 2 - 50, 100, 100); // Draw centered image
    };
}

  // Event listeners for buttons
  document.getElementById("prevBtn").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length; // Move to the previous image
    displayImage(currentIndex);
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length; // Move to the next image
    displayImage(currentIndex);
  });

  // Initial display
  displayImage(currentIndex);
};

window.addEventListener("DOMContentLoaded", (ev) => {
  // new MyCanvas(10, 20);
  // new Slider(images);
  for (let i = 0; i < imgArray.length; i++) {
    imgArray[i].src = images[i];
    ctx.drawImage(imgArray[i], i * 100, 0, 100, 100);
  }
});

// class MyCanvas {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//     console.log(x, y);
//   }
// }
