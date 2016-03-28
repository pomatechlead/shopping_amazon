var myApp = angular.module('myApp', [ 'ngRoute' ]);

/*product change factory*/
myApp.factory("ProductService", function($rootScope){
    var searchResult = [];
    return {
        setSearchResult: function (data) {
            searchResult = data;
            $rootScope.$broadcast("productListChanged");
        },
        getSearchResult: function() {
            return searchResult;
        }
    };

});

/*loading gif change factory*/
myApp.factory("LoadingGifService", function($rootScope){
    var actionResult;
    return {
        actionSet: function (data) {
            actionResult = data;
            $rootScope.$broadcast("loadingGifChanged");
        },
        action: function() {
            return actionResult;
        }
    };

});


//main controller define
myApp.controller('mainController',
    function($scope,$http, $rootScope, ProductService, LoadingGifService) {
        $scope.fnSearch = function() {
            //show loading gif file
            LoadingGifService.actionSet(true);

            var dataObj = { searchString: $scope.searchValue };
            $http.post('/macysProductSearch', dataObj).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    if(data == "success") {
                        $http.post('/getAmazonInitialResult', dataObj).
                            success(function(data, status, headers, config) {
                                // this callback will be called asynchronously
                                // when the response is available
                                ProductService.setSearchResult(data);

                                //show loading gif file
                                LoadingGifService.actionSet(false);
                            }).
                            error(function(data, status, headers, config) {
                                // called asynchronously if an error occurs
                                // or server returns response with an error status.
                            });
                    }
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        }

        $scope.$on('loadingGifChanged', function(event, args) {
            $scope.loading = LoadingGifService.action();
        });
    }
);

//product list controller define
myApp.controller('sideBarController',
    function($scope,$http) {
        $scope.showMoreMenu = function() {
            if($scope.menuVisible) {
                $scope.visibleTxt = "Show More Prices";
                $scope.visibleClass = "fa fa-caret-down";
                $scope.menuVisible = false;
            } else {
                $scope.visibleTxt = "Show fewer Prices";
                $scope.visibleClass = "fa fa-caret-up";
                $scope.menuVisible = true;
            }
        };

        $scope.init = function() {
            $scope.visibleTxt = "Show More Prices";
            $scope.visibleClass = "fa fa-caret-down";
            $scope.amazon = "list-group-item clearfix active";
        };

        $scope.fnRange1 = function() {
            if($scope.range1) {
                console.log("here");
            }
        };

        $scope.fnRange2 = function() {
            if($scope.range2) {
                console.log("here");
            }
        };

        $scope.fnRange3 = function() {
            if($scope.range3) {
                console.log("here");
            }
        };

        $scope.fnRange4 = function() {
            if($scope.range4) {
                console.log("here");
            }
        };

        $scope.fnRange5 = function() {
            if($scope.range5) {
                console.log("here");
            }
        };

        $scope.fnRange6 = function() {
            if($scope.range6) {
                console.log("here");
            }
        };

        $scope.fnRange7 = function() {
            if($scope.range7) {
                console.log("here");
            }
        };

        $scope.fnRange8 = function() {
            if($scope.range8) {
                console.log("here");
            }
        };

        $scope.fnRange9 = function() {
            if($scope.range9) {
                console.log("here");
            }
        };

        $scope.fnRange10 = function() {
            if($scope.range10) {
                console.log("here");
            }
        };

        $scope.fnRange11 = function() {
            if($scope.range11) {
                console.log("here");
            }
        };

        $scope.fnRange12 = function() {
            if($scope.range12) {
                console.log("here");
            }
        };

        $scope.fnRange13 = function() {
            if($scope.range13) {
                console.log("here");
            }
        };

        $scope.fnRange14 = function() {
            if($scope.range14) {
                console.log("here");
            }
        };

    }
);

//product list controller define
myApp.controller('productListController',
    function($scope,$http,$timeout, ProductService, LoadingGifService) {
        $scope.products = [];
        $scope.productInit = function() {
            LoadingGifService.actionSet(true);
            console.log(LoadingGifService.action());
            $scope.products = ProductService.getSearchResult();

            $http.post('/getInitialMacysProducts').
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    // ProductService.sharedObject = data;
                    if(data == "success") {
                        $http.post('/getMacysInitialResult').
                            success(function(data, status, headers, config) {
                                // this callback will be called asynchronously
                                // when the response is available
                                ProductService.setSearchResult(data);
                                //show loading gif file
                                LoadingGifService.actionSet(false);
                            }).
                            error(function(data, status, headers, config) {
                                // called asynchronously if an error occurs
                                // or server returns response with an error status.
                            });
                    }
                    // $scope.products = ProductService.getSearchResult();//.sharedObject;
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        };

        $scope.$on('productListChanged', function(event, args) {
            $timeout(function() {
                $scope.products = ProductService.getSearchResult();
            });
        });
    }
);
