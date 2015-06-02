"use strict";

app.service("apiService", ["$http", function($http) {

	var baseUrl = "http://api.bigoven.com";
	var apiKey = "dvxGq16Gv1AAeM199KJG5pCZT65Bp5kk";

	function appendTransform(defaults, transform) {
		// We can't guarantee that the default transformation is an array
		defaults = angular.isArray(defaults) ? defaults : [defaults];
		// Append the new transformation to the defaults
		return defaults.concat(transform);
	}

	var api = {
		/**
		 *
		 * @param filter - text, page
		 * @return promise which is fulfilled with the transformed response data
		 */
		findRecipes: function(filter) {
			var page = (filter.page || 0) + 1;
			var config = {
				url: baseUrl + "/recipes?pg=" + page + "&rpp=25&api_key="+ apiKey,
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
				transformResponse: appendTransform($http.defaults.transformResponse, api.transformRecipes)
			};
			// omit text filter if empty
			if (filter.text)
				config.url += "&title_kw=" + filter.text;
			return $http(config);
		},

		/**
		 * Transform the api response into our own structure
		 * @param data
		 * @returns {{total: *, data: *}}
		 */
		transformRecipes: function(data) {
			var result = {
				total: data.ResultCount
			};
			result.data = data.Results.map(function(apiRecipe) {
				var recipe = {
					id: apiRecipe.RecipeID,
					title: apiRecipe.Title,
					thumbnail: apiRecipe.ImageURL120,
					picture: apiRecipe.HeroPhotoUrl
				};
				return recipe;
			});
			return result;
		}
	};

	return api;
}]);
