// import "./style.css";

// import { setupCounter } from './counter.js'
// import { setupCounter } from './canvas.js'

let canvas, ctx;
let images = ['./img/01.jpeg','./img/02.jpeg','./img/03.jpeg','./img/04.jpeg'];
window.onload = function () {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

window.addEventListener("DOMContentLoaded", (ev) => {
  new MyCanvas(10, 20);
  new Slider(images);
  imgObj = new Image();
  imgObj.onload = function(){

  }
  imgObj.src = './img/01.jpeg';

  console.log( imgObj);
  
});

class MyCanvas {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    console.log(x, y);
  }
}
