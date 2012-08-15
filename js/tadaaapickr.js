/*
 A lightweight/nofuzz/bootstraped/pwned DatePicker for jQuery 1.7..
 that has built-in internationalization support,
 keyboard accessibility the full way,
 and very fast rendering
 - Compatible with a subset of the jquery UI Date Picker
 - Styled with Bootstrap

 Complete project source available at:
 https://github.com/zipang/tadaaapickr/

 Copyright (c) 2012 Christophe Desguez.  All rights reserved.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 */
(function ($) {

	var defaults = {
		calId       :"datepicker",
		dateFormat  :"mm/dd/yyyy",
		language    :"en",
		firstDayOfWeek: 0, // the only choices are : 0 = Sunday, 1 = Monday,
		required: false
	};

	/**
	 * This Constructor is publicly exposed as $.fn.datepicker.Calendar
	 * @param $target the input element to bind on
	 * @param options
	 */
	var Calendar = function($target, options) {
		this.$target = $target;
		this.settings = options;
		this.init(options);
	};

	Calendar.prototype = {

		init : function (options) {

			this.$cal = Calendar.build(options.calId, options.language);

			// Determine the plage of characters valid for a date input
			this.setDateFormat(options.format || options.dateFormat);

			// Add keyboard navigation support
			this.$target.keydown($.proxy(this.keyHandler, this));

			this.setStartDate(options.startDate);
			this.setEndDate(options.endDate);

			this.firstDayOfWeek = options.firstDayOfWeek;
			this.locale = Calendar.getLocale(options.language);
			this.defaultDate = (options.defaultDate || Calendar.now()); // what to display on first appearance ?

			// Bind click and focus event to show
			var show = $.proxy(this.show, this);
			this.$target.click(stopPropagation).focus(show);

			// Check manual input on blur
			this.$target.blur($.proxy(this.checkManualInput, this));
		},

		// Show a calendar displaying the current input value
		show : function (e) {
			e.stopPropagation();

			var $cal = this.$cal;

			if ($cal.hasClass("active")) {
				if ($cal.data("calendar") === this) {
					return;
				}
				Calendar.hide($cal);
			}

			var $target = this.$target, targetPos = $target.offset(),
				inputDate = Date.parse($target.val(), this.parsedFormat);

			this.setSelectedDate(inputDate, true);
			this.refreshDays();
			this.refresh();
			this.$cal.css({left: targetPos.left, top: targetPos.top + $target.outerHeight(false)})
				.slideDown(200).addClass("active").data("calendar", this);
			$target.select();

			// actice key handler
			this._keyHandler = this.activeKeyHandler;
		},

		hide: function() {
			Calendar.hide(this.$cal);
			this._keyHandler = this.inactiveKeyHandler;
			return this;
		},

		// Refresh (update) the calendar display to reflect the current
		// date selection and locales. If no selection, display the current month
		refresh: function() {

			var d = new Date(Date.UTC(this.year, this.month, 1)),
				dday = -1, mmonth = -1,
				$cal = this.$cal, $days = $cal.data("$days");

			if (this.selectedDate) {
				dday = this.selectedDate.getDate();
				mmonth = this.selectedDate.getMonth();
			}

			$cal.data("$header").text(Date.format(d, "MMM yyyy", this.settings.language));

			// find the first date to display
			while (d.getDay() != this.firstDayOfWeek) {
				d = Date.add(d, -1, "days");
			}

			for (var i=0; i < 6*7; i++) {
				var dayNumber = d.getDate(), month = d.getMonth();
				$days[i].innerHTML = dayNumber;
				if (month < this.month) {
					$($days[i]).addClass("old");
				} else if (month > this.month) {
					$($days[i]).addClass("new");
				} else if ((dayNumber == dday) && (month == mmonth)) {
					$cal.data("selected", i);
					$($days[i]).addClass("active");
				}
				d = Date.add(d, 1, "days");
			}

		},

		// Move the currently selected date from specified offset
		navigate: function(offset, unit) {

			var newDate = Date.add(this.selectedDate || Calendar.now(), offset, unit),
				$cal = this.$cal, $days = $cal.data("$days"),
				activeDayIndex = $cal.data("selected");

			if (newDate.getMonth() != this.month || newDate.getFullYear() != this.year) {
				this.setSelectedDate(newDate, true);
				$days.removeClass("active old new");
				this.refresh(); // full calendar display refresh needed

			} else {
				// we stay in the same month display : just refresh the 'active' cell
				$($days[activeDayIndex]).removeClass("active");
				$cal.data("selected", activeDayIndex += offset);
				$($days[activeDayIndex]).addClass("active");
				this.setSelectedDate(newDate, true);
			}

			return false;
		},

		/**
		 * Render the column headers for the days in the proper localization
		 * @param loc
		 * @param firstDayOfWeek (0 : Sunday, 1 : Monday)
		 */
		refreshDays: function() {

			var locale = this.locale,
				firstDayOfWeek = this.firstDayOfWeek;

			// Fill the day's names
			this.$cal.data("$dayHeaders").each(function(i, th) {
				$(th).text(locale.daysMin[i + firstDayOfWeek]);
			});

			this.refreshDays = noop; // @TODO : Find a better optimization
		},

		// Set a new start date
		setStartDate : function (d) {
			this.startDate = d;
			return this;
		},

		// Set a new end date
		setEndDate : function (d) {
			this.endDate = d;
			return this;
		},

		// Set a new selected date
		setSelectedDate : function (d, update) {
			var oldDate = this.selectedDate;

			if (d) {
				this.selectedDate = d;
				this.month = d.getMonth();
				this.year = d.getFullYear();
				if (update) {
					this.$target.val(Date.format(d, this.parsedFormat)).select();
					this.dirty = false;
				} else {
					this.dirty = (!oldDate || (oldDate - d));
				}
			} else {
				this.selectedDate = null;
				this.month = this.defaultDate.getMonth();
				this.year = this.defaultDate.getFullYear();
				if (update) {
					this.$target.val("").select();
					this.dirty = false;
				} else {
					this.dirty = (oldDate != null);
				}
			}
			return this;
		},

		// Set a new date format
		setDateFormat: function(format) {
			this.dateFormat = format;
			this.authorizedChars = "0123456789" + (this.parsedFormat = Date.parseFormat(format)).separators.join("");
			return this;
		},

		// ====== EVENT HANDLERS ====== //

		// the only registred key handler (wrap the call to active or inactive key handler)
		keyHandler: function(e) {
			return this._keyHandler(e);
		},

		// Add keyboard navigation to the input element
		activeKeyHandler: function(e) {

			switch (e.keyCode) {

				case 37: // LEFT
					return (e.ctrlKey) ? this.navigate(-1, "months") : this.navigate(-1, "days");

				case 38: // UP
					return (e.ctrlKey) ? this.navigate(-1, "years")  : this.navigate(-7, "days");

				case 39: // RIGHT
					return (e.ctrlKey) ? this.navigate(+1, "months") : this.navigate(+1, "days");

				case 40: // DOWN
					return (e.ctrlKey) ? this.navigate(+1, "years")  : this.navigate(+7, "days");

				case 9:  // TAB
				case 13: // ENTER
					// Send the 'Date change' event
					this.$target.trigger({type: "dateChange", date: this.selectedDate});
					return this.hide();
			}

			// Others keys are sign of a manual input
			this.dirty = true;
		},

		// When the calendar is not shown, show it first
		inactiveKeyHandler: function(e) {

			if (e.keyCode < 41 && e.keyCode > 36) {
				this.show(e);
				return (this._keyHandler = this.activeKeyHandler)(e);
			}

			// Others keys are sign of a manual input
			this.dirty = true;
		},

		// As manual input is also possible, check date validity on blur (lost focus)
		checkManualInput: function(e) {

			if (!this.dirty) return;

			var $target = this.$target,
				newDate = Date.parse($target.val(), this.parsedFormat);

			if (!newDate) { // invalid or empty input
				// restore the precedent value or erase the bad input
				this.setSelectedDate(this.required ? this.selectedDate || this.defaultDate : null, true);

			} else if (newDate - this.selectedDate) {
				this.setSelectedDate(newDate, true);
				this.$target.trigger({type: "dateChange", date: this.selectedDate});
			}

			this.hide();
		}
	};

	// Empty HTML content of the calendar
	Calendar.template = "<table class='table-condensed'><thead>" // calendar headers include the month and day names
		+ "<tr><th class='prev month'>&laquo;</th><th class='month name' colspan='5'></th><th class='next month'>&raquo;</th></tr>"
		+ "<tr>" + repeat("<th class='dow'/>", 7) + "</tr>"
		+ "</thead><tbody>" // now comes 6 * 7 days
		+ repeat("<tr>" + repeat("<td class='day'/>", 7) + "</tr>", 6)
		+ "</tbody></table>";


	/**
	 * Build a specific Calendar HTML widget with the provided id
	 * and the specific localization. Attach the events
	 */
	Calendar.build = function(calId, loc, firstDayOfWeek) {

		var $cal = $("#" + calId);

		if ($cal.length == 1) {
			return $cal; // reuse an existing widget
		}

		$cal = $("<div>")
			.attr("id", calId)
			.addClass("datepicker dropdown-menu")
			.html(Calendar.template)
			.appendTo("body");

		// Keep a reference on the cells to update
		$cal.data("$days", $("td.day", $cal));
		$cal.data("$header", $("th.month.name", $cal));
		$cal.data("$dayHeaders", $("th.dow", $cal));

		// Define the event handlers
		$cal.on("click", "td.day", function dayClick(e) {
			e.stopPropagation();

			var cal = $cal.data("calendar");
			if (!cal) return;

			var $day = $(this), day = +$day.text(),
				monthOffset = ($day.hasClass("old") ? -1 : ($day.hasClass("new") ? +1 : 0)),
				newDate = new Date(Date.UTC(cal.year, cal.month + monthOffset, day));

			// Update the $input control
			cal.$target
				.data("date", newDate)
				.val(Date.format(newDate, cal.dateFormat, cal.settings.language)).select()
				.trigger({type: "dateChange", date: newDate});

			// Save selected
			cal.setSelectedDate(newDate);

			// Hide
			cal.hide();
		});

		$cal.on("click", "th.month", function monthMove(e) {
			e.stopPropagation();
			e.preventDefault(); // IMPORTANT: prevent the input to loose focus!

			var cal = $cal.data("calendar");
			if (!cal) return;

			var $btn = $(this), direction = $btn.hasClass("prev") ? -1 : ($btn.hasClass("next") ? +1 : 0);

			if (direction) {
				$("tbody td", $cal).removeClass("old new active"); // @TODO : Optimize
				cal.month +=  direction;
				cal.refresh();
				cal.$target.select();
			}
		});

		return $cal;
	};

	/**
	 * Set all the defaults options associated to a defined locale
	 * @param loc i18n 2 letters country code
	 */
	Calendar.setDefaultLocale = function(loc) {

		var locale = Calendar.locales[loc];

		if (locale) {
			Calendar.setDefaults($.extend({language: loc}, locale.defaults));
		}
	};

	/**
	 * Return the locales options if they exist, or the english default locale
	 * @param loc a 2 letters i18n language code
	 * @return {*}
	 */
	Calendar.getLocale = function(loc) {
		var locales = Calendar.locales;
		return (locales[loc] || locales["en"]);
	};

	/**
	 * Override some predefined defaults with others..
	 * @param options
	 */
	Calendar.setDefaults = function(options) {
		$.extend(defaults, options);
	}

	/**
	 * Hide any instance of any active calendar widget (they should be only one)
	 * and clear the highlight class
	 * Usage calls may be :
	 * Calendar.hide() Hide every active calendar instance
	 * Calendar.hide(evt) (as in document.click)
	 * Calendar.hide($cal) Hide a specific calendar
	 */
	Calendar.hide = function($cal) {
		var $target = ((!$cal || $cal.originalEvent) ? $(".datepicker.active") : $cal);
		$target
			.removeClass("active").removeAttr("style")
			.find("td").removeClass("active old new");
	};

	/**
	 * Return the Universal Time version of the current day
	 * @return {Date}
	 */
	Calendar.now = function() {
		var now = new Date();
		return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
	};


	// Every other clicks must hide the calendars
	$(document).bind("click", Calendar.hide);

	// Plugin entry
	$.fn.datepicker = function(arg) {

		if (!arg || typeof(arg) === "object") { // initial call to create the calendar

			return $(this).each(function(i, target) {
				var options = $.extend({}, defaults,  arg);
				var cal = new Calendar($(target), options);
				$(target).data("datepicker", cal);
			});

		} else if (Calendar.prototype[arg]) { // invoke a calendar method on an existing instance

			var methodName = arg, args = Array.prototype.slice.call(arguments, 1);
			return $(this).each(function(i, target) {
				var cal = $(target).data("datepicker");
				try {
					cal[methodName].apply(cal, args);
				} catch (err) {

				}
			});

		} else {
			$.error("Method " + arg + " does not exist on jquery.datepicker");
		}

	};

	$.fn.datepicker.Calendar = Calendar;

	$.fn.datepicker.Calendar.locales = Date.locales || {
		en: {
			days       :["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
			daysShort  :["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			daysMin    :["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
			months     :["January", "February", "March", "April", "May", "June",
			             "July", "August", "September", "October", "November", "December"],
			monthsShort:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
		}
	};

	// UTILITIES
	function repeat(str, n) {
		return (n == 0) ? "" : Array(n+1).join(str);
	}
	function noop() {}
	function stopPropagation(e) {e.stopPropagation();}

})(jQuery);

