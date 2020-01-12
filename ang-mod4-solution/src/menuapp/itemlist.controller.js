// controller for the items component 
// picks up the menu items returned in the http promise response 
(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemListController', ItemListController);

// 'item' is injected through state's resolve
ItemListController.$inject = ['categoryItems']
function ItemListController(categoryItems) {
  var itemDetail = this;
  itemDetail.categoryItems = categoryItems.data;
  console.log("ItemListController inject got itemDetail = ", itemDetail.categoryItems);
}

})();
