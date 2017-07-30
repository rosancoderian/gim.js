export default function create (all) {
	all = all || Object.create(null);
	return {
		on (type, handler) {
			(all[type] || (all[type] = [])).push(handler);
		},
		off (type, handler) {
			if (all[type]) {
				all[type].splice(all[type].indexOf(handler) >>> 0, 1);
			}
		},
		emit (type, evt) {
			(all[type] || []).map((handler) => { handler(evt); });
			(all['*'] || []).map((handler) => { handler(type, evt); });
		}
	};
}