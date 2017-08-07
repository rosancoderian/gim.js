export function create (obj) {
	let events = Object.create(null)
	return Object.assign(obj || {}, {
		on (type, handler) {
			(events[type] || (events[type] = [])).push(handler)
		},
		off (type, handler) {
			if (events[type]) {
				events[type].splice(events[type].indexOf(handler) >>> 0, 1)
			}
		},
		emit (type, evt) {
			(events[type] || []).map((handler) => { handler(evt) })
			(events['*'] || []).map((handler) => { handler(type, evt) })
		}
	})
}