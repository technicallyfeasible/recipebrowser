var app = angular.module("app", ["ui.router", "ngAnimate"]);

app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state("recipes", {
		url: "/recipes?q",
		templateUrl: "templates/recipes.html",
		controller: "recipesController",
		reloadOnSearch: false
	});
	$stateProvider.state("recipes.detail", {
		url: "/:id",
		templateUrl: "templates/detail.html",
		controller: "detailController"
	});
	$urlRouterProvider.otherwise("/recipes");
}]);

app.run(["$rootScope", "$state", function ($rootScope, $state) {

	$rootScope.page = {
		title: ""
	};

	$rootScope.search = {
		value: "",
		execute: function() {
			$state.go("recipes", { q: $rootScope.search.value });
			$rootScope.$broadcast("searchChanged", $rootScope.search.value);
		}
	};
	$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
		if (toState && toState.name === "recipes")
			$rootScope.search.value = toParams.q;
	})

}]);

app.factory("jquery", [function() {
	return window.jQuery;
}]);
