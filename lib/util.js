module.exports = {
	isObject: isObject,
	merge: merge
};

function isObject(val) {
	return val !== null && typeof val === 'object';
}

function merge(to, from) {
	to = to || {};
	from = from || {};
	var key, toVal, fromVal;

	for (key in from) {
		if (!to.hasOwnProperty(key)) {
			to[key] = from[key];
		} else {
			toVal = to[key];
			fromVal = from[key];
			if (isObject(toVal) && isObject(fromVal)) {
				merge(toVal, fromVal);
			}
		}
	}
	return to;
}