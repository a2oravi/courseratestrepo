(function () {
"use strict";

angular.module('public')
.service('UserService', UserService);


UserService.$inject = ['$http', 'ApiPath'];
function UserService($http, ApiPath) {
  var service = this;
  var user;
  var menuItem;
  var error = {
    message : "Searching..."
  };

  var userInfo = {
    user : undefined,
    menuItem : undefined,
  };

  service.getMenuItem = function (u) {
    // issue http call 
    console.log("UserService.getMenuItem::for u = ", u);
    console.log("UserService.getMenuItem::for user = ", user);

    var promise = $http({
      method: "GET",
      url: (ApiPath + '/menu_items/' + u.favItem + ".json")
    });

    promise
     .then(function (response) {
      console.log("UserService.getMenuItem::got response = ", response.data);
      menuItem = response.data;
      user = u;
      u.message = "Your information has been saved.";
      console.log("UserService.getMenuItem::saved user = ", user);
      return menuItem;
    })
    .catch(function (errorResponse) {
      console.log("UserService.getMenuItem::got error = ", errorResponse);
      console.log("UserService.getMenuItem::got error u = ", u);
      console.log("UserService.getMenuItem::got error user = ", user);
      u.menuNotFound = "Menu item [" + u.favItem + "] not found";
      user = undefined;
      console.log("UserService.getMenuItem::saved user = ", user);

    });

  };

  service.getUser = function () {
    console.log("UserService.getUser::return user = ", user);
    return user;
  }

  service.setUser = function (u) {
    console.log("UserService.setUser::got u = ", u);
    console.log("UserService.setUser::got user = ", user);

    this.getMenuItem(u);
    console.log("UserService.setUser::setting user = ", user);
  }

  service.getError = function () {
    console.log("UserService.getErrorMessage::return ", error.message);
    return error;
  }

  service.getUserInfo = function () {
    console.log("UserService.getUserInfo::get for user  = ", user);
    if (user !== undefined) {
      return $http.get(ApiPath + '/menu_items/' + user.favItem + ".json").then(function (response) {
        userInfo.user = user;
        userInfo.menuItem = response.data;
        console.log("UserService.getUserInfo::return userInfo  = ", userInfo);
        return userInfo;
      });
    } else {
      console.log("UserService.getUserInfo::user not set return userInfo  = ", undefined);
      return undefined;
    }
  };

}



})();
