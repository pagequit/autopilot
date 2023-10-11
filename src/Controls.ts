export default class Controls {
  u: boolean;
  l: boolean;
  r: boolean;
  d: boolean;

  constructor() {
    this.u = false;
    this.l = false;
    this.r = false;
    this.d = false;
    this.addKeyboardListeners();
  }

  addKeyboardListeners() {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          this.u = true;
          break;
        case "ArrowDown":
          this.d = true;
          break;
        case "ArrowLeft":
          this.l = true;
          break;
        case "ArrowRight":
          this.r = true;
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowUp":
          this.u = false;
          break;
        case "ArrowDown":
          this.d = false;
          break;
        case "ArrowLeft":
          this.l = false;
          break;
        case "ArrowRight":
          this.r = false;
          break;
      }
    });
  }
}
