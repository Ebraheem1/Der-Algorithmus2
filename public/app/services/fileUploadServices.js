angular.module('fileUploadService', [])


.service('fileUpload', function($http){

	this.upload = function(file){
		var fd = new FormData();

		fd.append('myfile', file.upload);

		return $http.post('/upload', fd, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}
		});
	};
	
});