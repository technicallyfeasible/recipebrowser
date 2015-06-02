"use strict";

app.controller("recipesController", ["$rootScope", "$scope", "$state", "apiService", function($rootScope, $scope, $state, api) {

	$rootScope.page.title = "Recipes";

	$scope.totalCount = -1;
	$scope.data = [];

	api.findRecipes({ text: "", page: 0 })
		.success(function(result) {
			$scope.totalCount = result.total;
			$scope.data = result.data;
		});

}]);
