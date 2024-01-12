import Emitter from "./emitter.js";
import Particle from "./particle.js";


const emitter = new Emitter(Particle);

emitter.initEvent(100)
emitter.create(500);
emitter.animate()




