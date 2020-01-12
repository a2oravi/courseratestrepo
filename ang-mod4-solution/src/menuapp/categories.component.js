// categories component - shows the categories 
(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/menuapp/templates/menucategorylist.template.html',
  bindings: {
    items: '<'
  }
});

})();
