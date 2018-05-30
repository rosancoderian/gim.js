export default class Emitter {
    constructor (all = Object.create(null)) {
        this.all = all
    }

    on(type, handler) {
        (this.all[type] || (this.all[type] = [])).push(handler);
    }
    
    off(type, handler) {
        if (this.all[type]) {
            this.all[type].splice(this.all[type].indexOf(handler) >>> 0, 1);
        }
    }

    emit(type, evt) {
        (this.all[type] || []).slice().map(function (handler) { handler(evt); });
        (this.all['*'] || []).slice().map(function (handler) { handler(type, evt); });
    }
}