const canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
export const c = canvas.getContext("2d");

window.addEventListener("resize", (e) => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});
