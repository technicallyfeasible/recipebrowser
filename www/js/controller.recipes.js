"use strict";

/**
 * Displays the list of recipes
 */
app.controller("recipesController", ["$rootScope", "$scope", "$state", "apiService", function($rootScope, $scope, $state, api) {

	$rootScope.page.title = "Recipes";

	$scope.showTotal = true;
	$scope.totalCount = -1;
	$scope.data = [];
	$scope.resultText = null;

	var loadRecipes = function(text) {
		$scope.oldData = null;
		$scope.oldSearch = text;
		$scope.loading = true;
		$scope.resultText = null;
		api.findRecipes({text: text, page: 0})
			.error(function(result) {
				$scope.loading = false;
				$scope.totalCount = 0;
				$scope.resultText = "An error occurred while loading recipes. Please try again.";
			})
			.success(function (result) {
				$scope.loading = false;
				$scope.totalCount = result.total;
				$scope.oldData = $scope.data = result.data;
				if (!$scope.totalCount)
					$scope.resultText = "No recipes contain '" + text + "'.";
			});
	};
	// if the list of recipes is the current state then load them, otherwise just load the current
	if ($state.is("recipes"))
		loadRecipes($state.params.q);
	else if ($state.params.id) {
		api.getRecipe($state.params.id)
			.success(function (result) {
				$scope.data = [result];
			});
	}

	$rootScope.$on("searchChanged", function() {
		loadRecipes($state.params.q);
	});

	$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
		if (toState.name === "recipes") {
			$scope.showTotal = true;
			if ($scope.oldData && toParams.q === $scope.oldSearch)
				$scope.data = $scope.oldData;
			else
				loadRecipes($state.params.q);
		} else
			$scope.showTotal = false;
	});

	$scope.select = function(id) {
		if ($state.is("recipes.detail")) {
			$state.go("recipes", { id: id });
		} else {
			$state.go("recipes.detail", { id: id });
			// scroll list up to selected index, then remove all other items
			$scope.data = $scope.data.filter(function(r) {
				return r.id === id;
			});
		}
	};

}]);
