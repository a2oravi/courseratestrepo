(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItemsList.html',
    scope: {
      matchItems: '<',
      myTitle: '@title',
      myError: '@errorMessage',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'foundItemsDirectiveController',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;

}



NarrowItDownController.$inject = ['MenuSearchService'];

function NarrowItDownController(MenuSearchService) {
  var narrowItDownController = this;
  narrowItDownController.items = MenuSearchService.getFoundItems();
  narrowItDownController.error = MenuSearchService.getError();

  narrowItDownController.getMatchedMenuItems = function () {
    narrowItDownController.errorMessage = "Searching...";
    MenuSearchService.getMatchedMenuItems(narrowItDownController.searchTerm);

  } 

  narrowItDownController.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
  }

}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  // matched items 
  var foundItems = [];

  var error = {
    message : ""
  };

  service.getFoundItems = function () {
    return foundItems;
  }

  service.getError = function () {
    return error;
  }

  service.getMatchedMenuItems = function (searchTerm) {
    console.log("service.getMatchedMenuItems for searchTerm = " + searchTerm);
    // clean up the existing found array 
    foundItems.splice(0, foundItems.length);

    // clean up error message
    error.message = "Searching...";

    if (searchTerm !== undefined && searchTerm !== "") {
      // issue http call 
      var promise = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      });

      promise
       .then(function (response) {
        var allFoundItems = response.data.menu_items;
        if (allFoundItems !== undefined) {
          for (var index = 0; index < allFoundItems.length; index++) {
            if (allFoundItems[index].description.search(searchTerm) > -1) {
              foundItems.push(allFoundItems[index]);
            }
          }
        }
        console.log("service.getMatchedMenuItems::then foundItems = ");
        console.log(foundItems.length);
        if (foundItems.length === 0) {
          error.message = "Nothing found!";
        }

       })
     .catch(function (errorResponse) {
       console.log(errorResponse.message);
       error.message = errorResponse.message;
     });

   } else {
    console.log("service.getMatchedMenuItems::got empty searchTerm");
    error.message = "Nothing found!";
   }
  }


  service.removeItem = function (itemIndex) {
    foundItems.splice(itemIndex, 1);
    if (foundItems.length === 0) {
      error.message = "Nothing found!";
    }
  }

}

})();
