angular.module('nonRepeatableActivityFormController',['businessActivitiesServices','fileModelDirective', 'fileUploadService','authServices'])

// This controller takes the data submitted in the form of adding a new non-repeatable activity(Trip, Safari)
// and sends it to the appropriate service 'BusinessActivities' which then sends it to the appropriate backend function
.controller('nonRepeatableActivityFormCtrl',function($location,$scope,$route, $routeParams,BusinessActivities,Authentication,fileUpload){

	$scope.file = {};
	$scope.activityData={};

	$scope.addActivity = function() {


		$scope.loading=true;
		$scope.successMsg=false;
		$scope.errorMsg=false;
		$scope.activityData.type=$routeParams.activityType;
		
        fileUpload.upload($scope.file).then(function(data) {
            if (data.data.success) {
                
                $scope.activityData.image='gallery/'+data.data.name;
                BusinessActivities.create({data: $scope.activityData}).then(function(data){

					if(data.data.success){

						$scope.successMsg=data.data.message;
						$scope.loading=false;
						$scope.file = {};
						$scope.activityData={};
						$location.path('/viewBusinessActivities');
					}
					else
					{
						
						$scope.errorMsg=data.data.message;
						$scope.loading=false;
						
					}

				},function(err)
        		{ 
         	 		if(err.data){
            			Authentication.handleError();
          			}
        		});

            } 
            else 
            {
            	
                $scope.errorMsg = data.data.message;
                $scope.loading=false;                
            }

        },function(err)
        { 
          if(err.data){
            Authentication.handleError();
          }
        });

	}

}) ;
