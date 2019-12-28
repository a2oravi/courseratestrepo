(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var buyController = this;
  buyController.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

  buyController.moveItemToBought = function (itemIndex) {
    ShoppingListCheckOffService.moveItemToBought(itemIndex);
  } 

}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtController = this;
  boughtController.boughtItems = ShoppingListCheckOffService.getBoughtItems();
}


function ShoppingListCheckOffService() {
  var service = this;

  // to buy items 
  var toBuyItems = [ {name : 'cookies', quantity : 10}, 
                     {name : 'buns', quantity : 5},
                     {name : 'soda', quantity : 100},
                     {name : 'eggs', quantity : 10},
                     {name : 'milk', quantity : 20}
                   ];

  var boughtItems = [];


  service.getToBuyItems = function () {
    return toBuyItems;
  }

  service.getBoughtItems = function () {
    return boughtItems;
  }

  service.moveItemToBought = function (itemIndex) {
    var item = toBuyItems[itemIndex];
    toBuyItems.splice(itemIndex, 1);
    boughtItems.push(item);
  }

}

})();
