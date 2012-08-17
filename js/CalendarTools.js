/**
 * Usage example
 * var
 */
(function define(namespace) {

	var validParts = /dd?|mm?|MM(?:M)?|yy(?:yy)?/g;

	/**
	 * Adds n units of time to date d
	 * @param d:{Date}
	 * @param n:{Number} (can be negative)
	 * @param unit:{String} Accepted values are only : d|days, m|months, y|years
	 * @return {Date}
	 */
	function addToDate(d, n, unit) {
		var unitCode = unit.charAt(0);
		if (unitCode == "d") {
			return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
		} else if (unitCode == "m") {
			return new Date(d.getFullYear(), d.getMonth() + n, d.getDate());
		} else if (unitCode == "y") {
			return new Date(d.getFullYear() + n, d.getMonth(), d.getDate());
		}
	}

	/**
	 * Decompose a format string into its separators and date parts
	 * @param fmt
	 * @return {Object}
	 */
	function parseFormat(fmt) {
		// IE treats \0 as a string end in inputs (truncating the value),
		// so it's a bad format delimiter, anyway
		var parts = fmt.match(validParts),
			separators = fmt.replace(validParts, '\0').split('\0');

		if (!separators || !separators.length || !parts || parts.length == 0) {
			throw new Error("Invalid date format : " + fmt);
		}

		var positions = {};

		for (var i = 0, len = parts.length; i < len; i++) {
			var letter = parts[i].substr(0, 1).toUpperCase();
			positions[letter] = i;
		}

		return {separators:separators, parts:parts, positions:positions};
	}

	/**
	 * Returns a component of a formated date
	 * @param d
	 * @param partName
	 * @param loc
	 * @return {*}
	 */
	function dateParts(d, partName, loc) {

		switch (partName) {
			case 'dd'  : return (100 + d.getDate()).toString().substring(1);
			case 'mm'  : return (100 + d.getMonth() + 1).toString().substring(1);
			case 'yyyy': return d.getFullYear();
			case 'yy'  : return d.getFullYear() % 100;

			case 'MM'  : return Date.locales[loc].monthsShort[d.getMonth()];
			case 'MMM' : return Date.locales[loc].months[d.getMonth()];

			case 'd'   : return d.getDate();
			case 'm'   : return (d.getMonth() + 1);
		}
	}

	/**
	 * Format a given date according to the specified format
	 * @param d
	 * @param fmt a format string or a parsed format
	 * @return {String}
	 */
	function formatDate(d, fmt, loc) {

		if (!d || isNaN(d)) return "";

		var date = [],
			format = (typeof(fmt) == "string") ? parseFormat(fmt) : fmt,
			seps = format.separators;

		for (var i = 0, len = format.parts.length; i < len; i++) {
			if (seps[i]) date.push(seps[i]);
			date.push(dateParts(d, format.parts[i], loc));
		}
		return date.join('');
	}

	function parseDate(str, fmt) {

		if (!str) return null;

		var format  = (typeof(fmt) == "string") ? parseFormat(fmt) : fmt,
			matches = str.match(/[0-9]+/g); // only number parts interest us..

		if (matches && matches.length == 3) {
			var positions = format.positions; // tells us where the year, month and day are located
			return new Date(
				matches[positions.Y],
				matches[positions.M] - 1,
				matches[positions.D]
			);

		} else { // fall back on the Date constructor that can parse ISO8601 and other (english) formats..
			var parsed = new Date(str);
			return (isNaN(parsed.getTime()) ? undefined : parsed);
		}

	}


	var exportables = {
		add: addToDate,
		parseFormat: parseFormat,
		format: formatDate,
		parse: parseDate,
		locales: {
			en: {
				days       :["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
				daysShort  :["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				daysMin    :["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
				months     :["January", "February", "March", "April", "May", "June",
							 "July", "August", "September", "October", "November", "December"],
				monthsShort:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
			}
		}
	};


	// Temporary export under the 'Date' namespace in the browser
	for (var methodName in exportables) {
		namespace[methodName] = exportables[methodName];
	}

})(this.module ? this.module.exports : Date);
