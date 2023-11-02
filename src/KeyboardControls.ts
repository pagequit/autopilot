import { CarControls } from "./CarControls";

export default class KeyboardControls implements CarControls {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;

  constructor() {
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.addKeyboardListeners();
  }

  addKeyboardListeners() {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          this.up = true;
          break;
        case "ArrowDown":
          this.down = true;
          break;
        case "ArrowLeft":
          this.left = true;
          break;
        case "ArrowRight":
          this.right = true;
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowUp":
          this.up = false;
          break;
        case "ArrowDown":
          this.down = false;
          break;
        case "ArrowLeft":
          this.left = false;
          break;
        case "ArrowRight":
          this.right = false;
          break;
      }
    });
  }
}
