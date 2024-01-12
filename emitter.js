import { c } from "./canvasConfig.js";
import Util from "./util.js";
const util = new Util();

export default class Emitter {
  constructor(Particle, particleLimit) {
    this.Particle = Particle;
    this.particles = [];
    this.emitLimit = particleLimit;
    this.mouse = {
      x: null,
      y: null,
      dx: null,
      dy: null,
    };
    this.particleMaxSize = 50;
    this.particleMinSize = 4;
    this.mousefield = 100;
  }

  mouseInteraction(e) {
    this.particles.forEach((p) => {
      if (
        this.mouse.x - p.x < this.mousefield &&
        this.mouse.x - p.x > -this.mousefield &&
        this.mouse.y - p.y < this.mousefield &&
        this.mouse.y - p.y > -this.mousefield
      ) {
        Object.keys(p.color).forEach(value => p.color[value] = Math.max(p.color[value] + 5, p.resetValues.color[value]))
        p.r = Math.min(this.particleMaxSize, p.r + 1);
      } else {
        Object.keys(p.color).forEach(value => p.color[value] = p.resetValues.color[value])
        p.r = Math.max(p.resetValues.r, p.r - 0.2);
      }
    });
  }

  mouseField() {

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouseInteraction(e);
    })
  }

  create(amount) {
    while (amount > 0) {
      const particle = new this.Particle(...this.particleProps());
      this.particles.push(particle);
      amount--;
    }
  }

  particleProps() {
    const radius = Math.random() * (this.particleMinSize - 1) + 1 //Math.random() * 50;
    const x = Math.random() * (innerWidth - radius * 2) + radius;
    const y = Math.random() * (innerHeight - radius * 2) + radius;
    const dx = Math.random() * 0.5;
    const dy = Math.random() * 0.5;
    const color = util.getColorVariations();
    return [x, y, radius, dx, dy, color];
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    c.strokeStyle = 'white'
    c.lineWidth = 0.5;
    for (let particle of this.particles) {
      particle.update();
    }
    
    
    c.moveTo(this.mouse.x, this.mouse.y)
    c.beginPath();  // Start a new path
    c.strokeStyle = 'white'
    c.lineWidth = 1
    c.arc(this.mouse.x, this.mouse.y, this.mousefield, 0, Math.PI * 2);
    c.stroke();
    c.closePath();
  };
}
