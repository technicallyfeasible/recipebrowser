"use strict";

/**
 * Displays a detailed view of a recipe
 */
app.controller("detailController", ["$rootScope", "$scope", "$state", "apiService", "$timeout", function($rootScope, $scope, $state, api, $timeout) {

	$rootScope.page.title = "Recipes";

	$scope.recipe = null;

	api.getRecipe($state.params.id).success(function(data) {
		$scope.recipe = data;
	});

	$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
		$scope.recipe = null;
	});
}]);
