import Emitter from './emitter.js'

export default class Assets extends Emitter {
    constructor () {
        super()
        this.assets = null
    }

    load (paths = []) {
        this.assets = paths.reduce((assets, path, index) => {
            let img = new Image()
            img.src = path
            img.onload = () => {
                this.emit('load', { path, index, total: paths.length })
                if (index + 1 == paths.length) {
                    this.emit('complete', this)
                }
            }
            assets[path] = img
            return assets
        }, {})
    }

    get (path) {
        return this.assets[path]
    }
}