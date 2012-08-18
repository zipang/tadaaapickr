all: clean basic basicmin full fullmin 

clean: 
	rm -rf dist/
	mkdir dist/

# Concatenate the Calendar tools with the date picker and only the default localization (english)
basic: js/CalendarTools.js js/tadaaapickr.js 
	cat $^ > dist/tadaaapickr.en.js

# Concatenate all the existing localization resources with the datepicker
full: js/CalendarTools.js js/tadaaapickr.js js/locales/*.js
	cat $^ > dist/tadaaapickr.pack.js

basicmin: dist/tadaaapickr.en.js
	uglifyjs $^ > dist/tadaaapickr.en.min.js

fullmin: dist/tadaaapickr.pack.js
	uglifyjs $^ > dist/tadaaapickr.pack.min.js
