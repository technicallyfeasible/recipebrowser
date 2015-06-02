"use strict";

app.controller("detailController", ["$rootScope", "$scope", "$state", "apiService", function($rootScope, $scope, $state, api) {

	$rootScope.page.title = "Recipes";

	$scope.recipe = {
		id: $state.params.id
	};

	api.getRecipe($scope.recipe.id).success(function(data) {
		$scope.recipe = data;
	});

	//$rootScope.$on("$stateChangeStart")
	$scope.$on("destroy", function() {

	})
}]);
