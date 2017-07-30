import * as Game from './Game'
import * as Stage from './Stage'

export default function gim () {
  return {
    Game,
    Stage
  }
}

gim.game = Game
gim.stage = Stage

window.gim = gim