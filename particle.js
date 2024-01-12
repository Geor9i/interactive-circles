import { c } from "./canvasConfig.js";
export default class Particle {
  constructor(x, y, r, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.resetValues = { x, y, r, dx, dy, color: { ...color } };
  }

  draw() {
    const { r, g, b, a } = this.color;
    c.beginPath();
    c.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    c.fill();
    c.stroke();
  }

  update() {
    this.draw();
    this.x += this.dx;
    this.y += this.dy;
    if (this.x > innerWidth - this.r || this.x < 0 + this.r) {
      this.dx = -this.dx;
    }
    if (this.y > innerHeight - this.r || this.y < 0 + this.r) {
      this.dy = -this.dy;
    }
  }
}
