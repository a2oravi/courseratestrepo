// controller for the categories component 
// picks up the categories from the http promise response 
(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesListController', CategoriesListController);


CategoriesListController.$inject = ['items'];
function CategoriesListController(items) {
  var mainList = this;
  console.log("CategoriesListController::got items = ", items);
  // what we have got here from the http call is the http response obj
  // so now extract the actual data / json from server using response.data
  mainList.items = items.data;
}

})();
