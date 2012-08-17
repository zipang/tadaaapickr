tadaaapickr
===========

A lightweight, accessible jQuery DatePicker, styled with Bootstrap.. Tadaaa !!

* View the project page : http://zipang.github.com/tadaaapickr
* Try the demos : http://zipang.github.com/tadaaapickr/testpage.html
* Fork it on github : http://github.com/zipang/tadaaapickr

### Features

- Full keyboard navigation
	* Arrows keys navigate inside the calendar space
	* CTRL+arrows keys navigate in the months/years space
	* ESC key restore the native input value
- Full extensible internationalization support
- Lightweight markup. By default, only _one_ calendar is used on a whole page even with different locales.
- Super fast and responsive, even under IE6/7


Installation / Usage
--------------------

### Basics

Extract the js and css folders from the archive.

Then add references to the stylesheet and javascript files in your page:

    <link href="css/tadaaapickr.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/tadaaapickr.js"></script>


Create one ore more text input to tie the plugin to:

    <input type="text" id="txtDate" />
    <input type="text" class="date french" id="txtFrenchDate" />


Finally bind the plugin to the input textbox like this:

```javascript
    $("#txtDate").datepicker();
```

Pass some options like this :

```javascript
    $("input.date.french").datepicker({
        dateFormat: "dd/mm/yyyy",
        language: "fr"
    });
```

### Internationalization

Several options are related to the internationalization of the dates, `language` being the main one because it defines the way months and days will be named.

<table>
  <tr><th>Option</th><th>Type</th><th>Description</th><th>Default</th></tr>
  <tr><td><code>language</code></td><td><code>String</code></td><td>A 2 letters ISO 639-1 code defining the language to be used for day and months representation. </td><td>(default: 'en')</td></tr>
  <tr><td><code>dateFormat</code></td><td><code>String</code></td><td>Defining the input format. d, dd, m, mm, yy, yyyy are the usual suspects to define the format parts. </td><td>(default: 'mm/dd/yyyy')</td></tr>
  <tr><td><code>firstDayOfWeek</code></td><td><code>Number</code></td><td>Number between 0 and 6 to define the first day of the week. </td><td>(default 0 : Sunday)</td></tr>
</table>

These options can be set individually, but as we know, they are usually related. In France for example, we usually speak french, we have a date format where the days come first (which seems more logical in fact) and, like in the Bible, the first day of our week is Monday.

Hopefully, the internationalization files bundled with tadaaapickr come with some defaults settings for these 3 attributes and the way to access these default settings is to use the `locale` option.

So that the following call :

```javascript
    $("input.date.french").datepicker({
        dateFormat: "dd/mm/yyyy",
        firstDayOfWeek: 1,
        language: "fr"
    });
```

can be made shorter by specifying only the `locale` option :

```javascript
    $("input.date.french").datepicker({
        locale: "fr"
    });
```

If all your date pickers have the same locale settings (there is a great chance for that in fact) then, you can set once and for all the default locale and forget all about it in the subsequent calls.
This gives us the third equivalent formulation of the 2 precedent examples :

```javascript
    $.fn.datepicker.Calendar.setDefaultLocale("fr");
    $("input.date.french").datepicker();
    $("#startDate").datepicker({startDate: '01/01/2000'}); // will also get the french locale
```

### Programmable API : Date picker control

The calendar plugin has many built-in features that you can access as you wish, even after that it has been created.

For example, if you want to change the current date, or change any predefined options, you can do it programmatically in two ways :

The first way is to use the same jQuery selector syntax to access the same input elements that had been initialiazed as date pickers, and to send them new commands that can be chained the jQuery way :

```javascript
	// Narrow our date picker to events that occured during the French Revolution
    $("input#frenchRevolutionEvents")
    	.datepicker("setStartDate", "05/05/1789")	// Estates-General of 1789
    	.datepicker("setDate", "14/07/1789") 		// Storming of the Bastille
    	.datepicker("setEndDate", "20/06/1791");	// Flight to Varennes
```

This allows to send commands to multiple items at the same time.

The second -more traditional- way, is to access the Calendar object defined on any initialized datepicker that way :

```javascript
	// Narrow our date picker to events during the French Revolution
    var frenchCalendar = $("input#frenchRevolutionEvents").data("calendar");
    frenchCalendar
    	.setStartDate(new Date(1789, 5, 5))
    	.setDate(new Date(1989, 7, 14));
    	.setEndDate(new Date(1981, 6, 20))
```

<note>Note that in both cases, methods expecting date parameters can be passed as arguments a real Date object, or a String representing a date in the date picker's declared format. </note>

Acknowlegements
---------------

This plugin would not have been made without the precedent awesome work of :

* [Stefan Petre](http://www.eyecon.ro) and [Andrew Rowls](https://github.com/eternicode) who started the first versions [^1] [^2] of a date picker styled with Bootstrap.
* [Gautam Lad](https://github.com/glad) for the way its glDatePicker methods can be called via the same jQuery syntax.
* [John Resig](https://github.com/jeresig) because he gave us jQuery, and we forgot about Prototype..

[^1]: http://www.eyecon.ro/bootstrap-datepicker
[^2]: https://github.com/eternicode/bootstrap-datepicker


License
-------

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
