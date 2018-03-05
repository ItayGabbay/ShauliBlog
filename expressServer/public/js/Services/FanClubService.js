'use strict';

var fansClubModule = angular.module('fansClubModule');

fansClubModule.service('fansClubService', ['$http', 
function ($http) {
	return {
		searchFans: function(firstName, lastName, birthday, gender, address) {
			let queryParams = {};
			// Setting only wanted filters
			firstName && (queryParams.firstName = firstName);
			lastName && (queryParams.lastName = lastName);
			birthday && (queryParams.dateOfBirth = birthday);
			gender && gender !== "all" && (queryParams.gender = gender);
			address && (queryParams.address = address);
			
			return $http({
				url:"fans/",
				method: "GET",
				params: queryParams
			});
		},
		getFans: function() {
			return $http({
				url:"fans/",
				method: "GET"
			});
		},
		createFan: function(fan) {
			// assuming fan is valid
			return $http({
				url: "fans/",
				method: "POST",
				data: fan
			});
		}
	}
}])