var app = angular.module("app", ["ui.router"/*, "ngTouch", "angular-carousel"*/]);

app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state("recipes", {
		url: "/recipes",
		templateUrl: "templates/recipes.html",
		controller: "recipesController"
	});
	$stateProvider.state("recipes.detail", {
		url: "/recipes/:id",
		templateUrl: "templates/detail.html",
		controller: "detailController"
	});
	$urlRouterProvider.otherwise("/recipes");
}]);

app.run(["$rootScope", function ($rootScope) {

	$rootScope.page = {
		title: ""
	};

}]);

app.factory("jquery", [function() {
	return window.jQuery;
}]);
