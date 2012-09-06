/**
 * French translation for Date locales
 */
;(function($) {

	var code = "fr",
		translations = {
			defaults: {dateFormat: "dd/mm/yyyy", firstDayOfWeek: 1},
			days:      ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
			daysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
			daysMin:   ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"],
			months:    ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
						"Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
			monthsShort: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"]
		};

	$.each([Date.locales, $.fn.datepicker.Calendar.locales], function(i, locale) {
		if (locale) locale[code] = translations;
	});

})(jQuery);
