(function () {
"use strict";

angular.module('public')
.controller('MyinfoController', MyinfoController);

MyinfoController.$inject = ['userInfo'];
function MyinfoController(userInfo) {
  var $ctrl = this;
  $ctrl.userInfo = userInfo;
}


})();
