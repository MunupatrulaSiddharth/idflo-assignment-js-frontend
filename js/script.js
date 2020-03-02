var app = angular.module('MyApp', ['ngPatternRestrict',])
        app.controller('MyController', function ($scope,$http) {
            $scope.obj = {};
            var apiUrl = "http://localhost:8000/";
            $scope.countriesData =  ["India", "USA", "China"];
            $scope.editCountry = function(obj){
                $http.get(apiUrl + "fetchCitiesForCountry/"+obj).then(function(response){
                    $scope.citiesData = response.data;
                    console.log($scope.citiesData);
                    return { data: response.data };
                })  
            };
         
            $scope.funct = function(obj) {
                var dob = document.getElementById("dateOfBirth").value;
                console.log(dob);
               
               var dateFormat =  function (dob) {
                   var dob = dob.split('-');
                   console.log(dob);
                   var day = dob[2];
                   var month = dob[1];
                   var year = dob[0];
                   console.log(day + "/" + month + "/" + year);              
                    return day + "/" + month + "/" + year;
                  }
                 dob = dateFormat(dob);
                console.log(dob);
                $scope.obj.dob = dob;
                console.log($scope.obj);
                $http.post(apiUrl + "submitForm",$scope.obj)
                    .then(function (data) {
                        console.log(data);
                        console.log("posted");
                    }, function (data) {
                        console.log("error");
                    })

            }
        });