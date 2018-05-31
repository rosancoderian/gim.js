import Emitter from './emitter.js'

export default class Assets extends Emitter {
    constructor () {
        super()
        this.assets = {}
    }

    load (assets = []) {
        return Promise.all(assets.map((asset) => {
            let img = new Image()
            return new Promise((resolve, reject) => {
                img.onload = () => {
                    this.assets[asset.name] = img
                    resolve()
                }
                img.onerror = () => reject()
                img.src = asset.url
            })
        }))
    }

    get (name) {
        return this.assets[name]
    }
}