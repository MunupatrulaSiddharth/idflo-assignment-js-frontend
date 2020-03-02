var app = angular.module('IDFLOApp', ['ngPatternRestrict',])
//controller for the date time picker to set the format
app.controller("DatepickerDemoCtrl", function ($scope) {
    $("#datetimepicker1").datetimepicker({
        format: "DD/MM/YYYY"
    });

});
//Form controller to carry all the scripts related to the form submission
app.controller('FormController', function ($scope, $http) {
    //initialising an object to store all the form data
    $scope.obj = {};
    var apiUrl = "http://localhost:8000/";
    //the countries data is hard coded as per the given document
    $scope.countriesData = ["India", "USA", "China"];
    //the editCountry function is invoked everytime the user selects a different country in the countries dropdown
    $scope.editCountry = function (obj) {
        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        //http request to fetch cities for the selected country
        $http.get(apiUrl + "fetchCitiesForCountry/" + obj, config).then(function (response) {
            $scope.citiesData = response.data;
            console.log($scope.citiesData);
            return { data: response.data };
        })
    };
//formSubmit is the function for the submission of the form once the user fills in the data based on the validations of the form
    $scope.formSubmit = function (obj) {
        var dob = document.getElementById("dateOfBirth").value;
        $scope.obj.dob = dob;
        //http request to post the form data. The $scope.obj is the data being passed as the body object containing the data.
        $http.post(apiUrl + "submitForm", $scope.obj)
            .then(function (data) {
                console.log(data);
                console.log("posted");
                alert("Form submitted Successfully !");
                $scope.obj = {};
                var original = $scope.obj;
                $scope.obj = angular.copy(original);
                $('dateOfBirth').datetimepicker('setDate', null);
            }, function (data) {
                console.log("error");
                alert("Oops! Form submission failed! Please try again later.")
            })

    }
});