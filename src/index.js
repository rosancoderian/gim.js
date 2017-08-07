import * as Game from './Game'
import * as Stage from './Stage'
import * as Event from './Event'

const gim = {
  Game,
  Stage
}

if (window) {
  window.gim = gim
}

export default gim