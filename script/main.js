/// <reference path="angular.js">
/// <reference path="angular-route.js">
var app = angular
        .module('app', ["ngRoute", "ui.router"])
        .config(function ($routeProvider, $locationProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: 'components/home.html',
                    controller: 'homeController'
                })
                .when("/courses", {
                    templateUrl: 'components/courses.html',
                    controller: 'coursesController'
                })
                .when("/students", {
                    templateUrl: 'components/students.html',
                    controller: 'studentsController',
                    controllerAs: 'stdCtrl',
                    resolve: {
                        studentList: function ($http) {
                            return $http.get('http://localhost:3001/api/students').then(function (response){
                                return response.data.response
                            }, function (error) {
                                return error
                            });
                        }
                    }
                })
                .when("/students/:id", {
                    templateUrl: 'components/studentDetails.html',
                    controller: 'studentDetailsController as stdDetailCtrl'
                })
                .otherwise({
                    redirectTo: "/"
                })
            $locationProvider.html5Mode(true)
        })
        .controller('homeController', function ($scope) {
            $scope.title = 'Home Page'
        })
        .controller('coursesController', function ($scope) {
            $scope.title = 'Courses Page'
        })
        .controller('studentsController', function (studentList, $log, $rootScope) {
            var self = this
            self.title = 'Students Page';
            self.students = studentList
            $rootScope.$on("$locationChangeStart", function () {
                $log.debug("$locationChangeStart")
            });
            $rootScope.$on("$locationChangeSuccess", function () {
                $log.debug("$locationChangeSuccess")
            });

            $rootScope.$on("$routeChangeStart", function () {
                $log.debug("$routeChangeStart")
            });
            $rootScope.$on("$routeChangeSuccess", function () {
                $log.debug("$routeChangeSuccess")
            });
            // $scope.$on("$routeChangeStart", function (event, next, current) {
            //     if (!confirm("Are you sure to redirect? " + next.$$route.originalPath)) {
            //         $log.info("Event :- ", event)
            //         $log.info("Next :- ", next)
            //         $log.info("Current :- ", current)
            //         event.preventDefault()
            //     }
            // });
            // $scope.$on("$locationChangeStart", function (event, next, current) {
            //     if (!confirm("Are you sure to redirect?")) {
            //         $log.info("Event :- ", event)
            //         $log.info("Next :- ", next)
            //         $log.info("Current :- ", current)
            //         event.preventDefault()
            //     }
            // });
        })
        .controller('studentDetailsController', function ($http, $log, $routeParams) {
            var self = this
            self.title = 'Student Detail Page';
            $http({
                url: "http://localhost:3001/api/student",
                params: { id: $routeParams.id },
                method: "get"
            }).then(function (response){
                self.student = response.data.response
            }, function (error) {
                $log.info("Error :- ", error)
            });
        })