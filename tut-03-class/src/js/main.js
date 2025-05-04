// import "./style.css";
import { gsap } from 'gsap';
import { Controller, Window, Rotate, Home, Intro, Navigation } from './classes';

// Canvas initialization
let canvas, ctx;
let images = [
  "./img/01.jpeg",
  "./img/02.jpeg",
  "./img/03.jpeg",
  "./img/04.jpeg",
];
let imgArray = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  const config = {
    device: 'd', // 'd' for desktop, 'm' for mobile
    transitionM: null, // Will be set by the Controller
    engine: null // Will be set by the Controller
  };

  // Initialize core components
  const controller = new Controller(config);
  const windowManager = new Window(config.device);
  const navigation = new Navigation();
  const home = new Home();
  const intro = new Intro();

  // Initialize mobile-specific components
  if (config.device === 'm') {
    new Rotate();
  }

  // Initialize components
  navigation.init();
  home.init();
  intro.init();

  // Start intro sequence
  intro.play(() => {
    // After intro completes, initialize home page
    home.play();
  });
});

// Load images
window.onload = function () {
  canvas = document.querySelector('canvas');
  ctx = canvas.getContext('2d');

  // Load images
  images.forEach(src => {
    const img = new Image();
    img.src = src;
    imgArray.push(img);
  });
};
