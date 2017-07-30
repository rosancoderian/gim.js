console.log('asdasd')
export function create(canvas, scene) {
  document.addEventListener('keydown', () => { console.log('keydown') }, false);
  document.addEventListener('keyup', () => { console.log('keyup') }, false);
  canvas.addEventListener('click', () => { console.log('click') }, false);
  canvas.addEventListener('mousemove', () => { console.log('mousemove') }, false);
  // canvas.addEventListener('touchstart', ontouchstart, false);
  // canvas.addEventListener('touchmove', ontouchmove, false);
}