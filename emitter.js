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
  }

  initEvent(mouseDistance) {
    window.addEventListener("mousemove", (e) => {
      this.mouseInteraction(e, mouseDistance);
    });
  }

  mouseInteraction(e, mouseDistance) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;

    this.particles.forEach((p) => {
      if (
        this.mouse.x - p.x < mouseDistance &&
        this.mouse.x - p.x > -mouseDistance &&
        this.mouse.y - p.y < mouseDistance &&
        this.mouse.y - p.y > -mouseDistance
      ) {
        Object.keys(p.color).forEach(value => p.color[value] = Math.max(p.color[value] + 5, p.resetValues.color[value]))
        p.r = Math.min(this.particleMaxSize, p.r + 1);
      } else {
          Object.keys(p.color).forEach(value => p.color[value] = p.resetValues.color[value])
        p.r = Math.max(p.resetValues.r, p.r - 0.2);
    }
    // if (this.mouse.x - p.x > -mouseDistance && this.mouse.x - p.x < mouseDistance && this.mouse.y - p.y > -mouseDistance && this.mouse.y - p.y < mouseDistance) {
    //     const sign = Math.sign(this.mouse.x - p.x);
    //     p.x = this.mouse.x - (mouseDistance * sign)
    // }
    // if (this.mouse.y - p.y > -mouseDistance && this.mouse.y - p.y < mouseDistance && this.mouse.x - p.x > -mouseDistance && this.mouse.x - p.x < mouseDistance) {
    //     const sign = Math.sign(this.mouse.y - p.y);
    //     p.y = this.mouse.y - (mouseDistance * sign)
    // }
    
    });
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
    for (let particle of this.particles) {
      particle.update();
    }
  };
}
