(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  // Categories component 
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuapp/templates/categories.template.html',
    controller: 'CategoriesListController as categoriesList',
    resolve: {
      // the getAllCategories is going to return a promise 
      // and resolve will advance only if success 
      // so items is now the response object from http success 
      items: ['MenuDataService', function (MenuDataService) {
        var promise =  MenuDataService.getAllCategories();
        console.log("categories component got promise ", promise);
        return promise;
      }]
    }
  })

  // items component - items in the selected category 
  .state('items', {
    url: '/items-list/{shortName}',
    templateUrl: 'src/Menuapp/templates/items.template.html',
    controller: 'ItemListController as itemList',
    resolve: {
      categoryItems: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
        console.log("items component getting for shortName = ", $stateParams.shortName);
        var promise =  MenuDataService.getItemsForCategory($stateParams.shortName);
        console.log("items component got promise ", promise);
        return promise;
      }]
    }
  });
}

})();
