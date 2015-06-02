"use strict";

app.controller("recipesController", ["$rootScope", "$scope", "$state", "apiService", function($rootScope, $scope, $state, api) {

	$rootScope.page.title = "Recipes";

	$scope.totalCount = -1;
	$scope.data = [];

	var loadRecipes = function(text) {
		api.findRecipes({text: text, page: 0})
			.success(function (result) {
				$scope.totalCount = result.total;
				$scope.data = result.data;
			});
	};
	loadRecipes($state.params.q);

	$rootScope.$on("searchChanged", function(event, text) {
		loadRecipes($state.params.q);
	});

}]);
