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

    $("#txtDate").datepicker();

Pass some options like this :

    $("input.date.french").datepicker({
        dateFormat: "dd/mm/yyyy",
        language: "fr"
    });

### Internationalization

Several options are related to the internationalization of the dates, `language` being the main one because it defines the way months and days will be named.

* `language` (default: 'en')
* `dateFormat` (default: 'mm/dd/yyyy')
* `firstDayOfWeek` (default 0)

These options can be set individually, but as we know, they are usually related

So, the internationalization files come with defaults settings for these 3 attributes.
One way to set these setting is to use the `locale` option.

So the following 2 calls are equivalents :

    $("input.date.french").datepicker({
        dateFormat: "dd/mm/yyyy",
        firstDayOfWeek: 1,
        language: "fr"
    });

or

    $("input.date.french").datepicker({
        locale: "fr"
    });

If all your date pickers have the same locale settings (there is a great chance for that in fact) then, you can set once and for all the default locale setting and forget it after.
This gives us the third equivalent formulation of the 2 precedent examples :

    $.fn.datepicker.Calendar.setDefaultLocale("fr");
    $("input.date.french").datepicker();
    $("#startDate").datepicker({startDate: '01/01/2000'}); // will also get the french locale


Acknowlegements
---------------

This plugin would not have been made without the precedent awesome work of :

* [Stefan Petre](http://www.eyecon.ro) and [Andrew Rowls](https://github.com/eternicode) who started the first versions[1] [2] of a date picker styled with Bootstrap.
* [Gautam Lad](https://github.com/glad) for the way its glDatePicker methods can be called via the same jQuery syntax.
* [John Resig](https://github.com/jeresig) because he gave us jQuery, and we forgot about Prototype..

[1]: http://www.eyecon.ro/bootstrap-datepicker/
[2]: https://github.com/eternicode/bootstrap-datepicker


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
