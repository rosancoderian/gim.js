import Emitter from './emitter.js'

export default class Assets extends Emitter {
    constructor () {
        super()
        this.assets = {}
    }

    load (name, url) {
        let img = new Image()
        return new Promise((resolve, reject) => {
            img.onload = () => {
                this.assets[name] = img
                resolve()
            }
            img.onerror = () => reject()
            img.src = url
        })
    }

    loads (assets = []) {
        return Promise.all(assets.map(asset => this.load(asset.name, asset.url)))
    }

    get (name) {
        return this.assets[name]
    }
}