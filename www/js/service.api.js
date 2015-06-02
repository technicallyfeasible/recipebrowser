"use strict";

/**
 * Handles service calls to the BigOven API and transformation of the results
 */
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
				cache: true,
				transformResponse: appendTransform($http.defaults.transformResponse, api.transformRecipes)
			};
			// omit text filter if empty
			if (filter.text)
				config.url += "&title_kw=" + filter.text;
			return $http(config);
		},

		/**
		 *
		 * @param id - id of the recipe to load
		 * @return promise which is fulfilled with the transformed response data
		 */
		getRecipe: function(id) {
			var config = {
				url: baseUrl + "/recipe/" + id + "?api_key="+ apiKey,
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
				cache: true,
				transformResponse: appendTransform($http.defaults.transformResponse, api.transformRecipe)
			};
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
			result.data = (data.Results || []).map(api.transformRecipe);
			return result;
		},

		/**
		 * Transform the api response into our own structure
		 * @param apiRecipe
		 * @returns {{id: *, title: *, thumbnail: *, picture: *}}
		 */
		transformRecipe: function(apiRecipe) {
			var recipe = {
				id: apiRecipe.RecipeID,
				title: apiRecipe.Title,
				thumbnail: apiRecipe.ImageURL120 || apiRecipe.ImageURL,
				picture: apiRecipe.ImageURL,
				ingredients: (apiRecipe.Ingredients || []).map(api.transformIngredient),
				description: apiRecipe.Description || "",
				instructions: apiRecipe.Instructions || ""
			};
			return recipe;
		},

		/**
		 * Transform the api response into our own structure
		 * @param apiIngredient
		 * @returns {{id: *, title: *, thumbnail: *, picture: *}}
		 */
		transformIngredient: function(apiIngredient) {
			var ingredient = {
				id: apiIngredient.IngredientID,
				name: apiIngredient.Name,
				quantity: apiIngredient.MetricQuantity,
				unit: apiIngredient.MetricUnit

			};
			return ingredient;
		}
	};

	return api;
}]);
