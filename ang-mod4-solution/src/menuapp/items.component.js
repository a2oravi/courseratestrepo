// items component - shows the menu items under the selected category 
(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/menuapp/templates/categoryitemlist.template.html',
  bindings: {
    menuitems: '<'
  }
});

})();
