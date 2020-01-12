// included with data module 
// makes http call to get json 
// returns promise to caller s
(function () {
'use strict';

angular.module('Data')
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$http', 'ApiBasePath']
function MenuDataService($http, ApiBasePath) {
  var service = this;

  // matched items 
  var categories = [];

  var error = {
    message : ""
  };

  service.getError = function () {
    return error;
  }

  service.getAllCategories = function () {
    console.log("service.getAllCategories do http call");

    // issue http call 
    var promise = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    });

    return promise;

    // we need the below if we have to read data from the promise 
    // in this assignment the resolve in the component is going to handle the promise 
    // promise
    // .then(function (response) {
    //   categories = response.data;
    //   console.log("service.getAllCategories::then categories = ", categories.length);
    //   return categories;
    // })
    // .catch(function (errorResponse) {
    //  console.log(errorResponse.message);
    //  error.message = errorResponse.message;
    //  return categories;
    // });
    
  }

  service.getItemsForCategory = function (shortName) {
    console.log("service.getItemsForCategory do http call for shortName = ", shortName);

    // issue http call 
    var promise = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {category : shortName}
    });

    return promise;

    // we need the below if we have to read data from the promise 
    // in this assignment the resolve in the component is going to handle the promise 
    // promise
    // .then(function (response) {
    //   categories = response.data;
    //   console.log("service.getAllCategories::then categories = ", categories.length);
    //   return categories;
    // })
    // .catch(function (errorResponse) {
    //  console.log(errorResponse.message);
    //  error.message = errorResponse.message;
    //  return categories;
    // });
    
  }

}

})();
