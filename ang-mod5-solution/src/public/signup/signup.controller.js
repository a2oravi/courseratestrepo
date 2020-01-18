(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['UserService'];
function SignupController(UserService) {
  var signupController = this;
  var user = UserService.getUser();
  var a = "ABC";
  var err = "Some message";
  console.log("signupController.constr::err = ", err);
  console.log("signupController.constr::user = ", user);

  signupController.submit = function () {
    console.log("signupController.submit::got user = ", signupController.user);
    signupController.user.message = "";
    signupController.user.menuNotFound = "";

    console.log("signupController.submit::got error = ", signupController.err);
    UserService.setUser(signupController.user);
  }
}


})();
