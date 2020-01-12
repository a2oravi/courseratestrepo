// main module 
// depends on ui-router and data module 
// data module responsible for http call to get json
(function () {
'use strict';

angular.module('MenuApp', ['ui.router', 'Data', 'Spinner']);

})();
