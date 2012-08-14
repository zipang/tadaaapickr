tadaaapickr
===========

A lightweight, accessible jQuery DatePicker, styled with Bootstrap.. Tadaaa !!

Find the latest download, fully functional examples and instructions on how
to use and configure this plugin at: http://github.com/zipang/tadaaapickr

Test the project : http://zipang.github.com/tadaaapickr

### Features

- full keyboard navigation
	* arrows keys navigate inside the calendar space
	* ctrl+arrows keys nab=vigates in the months/years space
	* esc key restore the native input value
- full extensible internationalization support
- lightweight markup. By default, only one calendar is used on a whole page.
- fast and responsive, even under IE6/7


Installation / Usage
--------------------

Extract the js and css folders from the archive.

Then add references to the stylesheet and javascript files in your page:

    <link href="css/default.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/tadaaapickr.js"></script>


Create one ore more text input to tie the plugin to:

    <input type="text" id="txtDate" />


Finally bind the plugin to the input textbox and set any options you want:

    $("#txtDate").datepicker({
        startDate: new Date("September 5, 2011"),
        endDate: new Date("October 26, 2011")
    });

Acknowlegements
---------------

This plugin would not have been made without the precedent awesome work of :



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
