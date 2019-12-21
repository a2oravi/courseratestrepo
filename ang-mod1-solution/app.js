(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  //$scope.dishes = "enter comma seperated dishes";
  $scope.lunchMessage = "";

  $scope.checkDishes = function () {
  	console.log("got dishes = " + $scope.dishes);
  	if ($scope.dishes == null || $scope.dishes == "") {
  		$scope.lunchMessage = "Please enter data first !";
  	} else {
  		var res = $scope.dishes.split(",");
  		console.log("Got array length = " + res.length);
  		if (res.length <= 3) {
			$scope.lunchMessage = "Enjoy !";
  		} else {
  			$scope.lunchMessage = "Too much !";
  		}
  	}
  };

}

})();
