import * as Event from './Event'

export function create () {
  let input = Event.create()
  document.addEventListener('keydown', (e) => { 
    input.emit('onkeydown') 
  }, false);
  document.addEventListener('keyup', (e) => { 
    input.emit('onkeyup') 
  }, false);
  document.addEventListener('click', (e) => {
    input.emit('onclick') 
  }, false);
  document.addEventListener('mousemove', (e) => {
    input.emit('onmousemove')
  }, false);
  return input
}