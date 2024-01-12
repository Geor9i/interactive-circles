export default class Util {
  constructor() {}

  getColorVariations() {
    const r = 255;
    const g = Math.trunc(77 + Math.random() * 85);
    const b = 77;
    const a = 1
    return { r, g, b, a };
  }
}
