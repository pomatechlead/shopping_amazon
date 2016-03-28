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
            //show loading gif image
            LoadingGifService.actionSet(true);

            var dataObj = { searchString: $scope.searchValue };
            $http.post('/amazonProductSearch', dataObj).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    if(data == "success") {
                        $http.post('/getAmazonInitialResult', dataObj).
                            success(function(data, status, headers, config) {
                                // this callback will be called asynchronously
                                // when the response is available
                                ProductService.setSearchResult(data);

                                //show loading gif image
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

//sidebar controller define
myApp.controller('sideBarController',
    function($scope,$http, $rootScope, ProductService, LoadingGifService) {
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

        $scope.slideRange = function() {
            //show loading gif image
            LoadingGifService.actionSet(true);

            var dataObj = { price1: $scope.slidePrice1, price2: $scope.slidePrice2 };
            $http.post('/amazonProductSlideFilter', dataObj).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    ProductService.setSearchResult(data);

                    //hide loading gif file
                    LoadingGifService.actionSet(false);
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        }

        var filterWithPriceRange = function(priceRange, index) {
            //show loading gif image
            LoadingGifService.actionSet(true);

            var dataObj = { priceRange: priceRange };
            $http.post('/amazonProductFilter', dataObj).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    ProductService.setSearchResult(data);

                    //hide loading gif file
                    LoadingGifService.actionSet(false);
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        }

        $scope.fnRange1 = function() {
            if($scope.range[1]) {
                filterWithPriceRange("priceRange1",1);
            }
        };

        $scope.fnRange2 = function() {
            if($scope.range[2]) {
                filterWithPriceRange("priceRange2",2);
            }
        };

        $scope.fnRange3 = function() {
            if($scope.range[3]) {
                filterWithPriceRange("priceRange3",3);
            }
        };

        $scope.fnRange4 = function() {
            if($scope.range[4]) {
                filterWithPriceRange("priceRange4",4);
            }
        };

        $scope.fnRange5 = function() {
            if($scope.range[5]) {
                filterWithPriceRange("priceRange5",5);
            }
        };

        $scope.fnRange6 = function() {
            if($scope.range[6]) {
                filterWithPriceRange("priceRange6",6);
            }
        };

        $scope.fnRange7 = function() {
            if($scope.range[7]) {
                filterWithPriceRange("priceRange7",7);
            }
        };

        $scope.fnRange8 = function() {
            if($scope.range[8]) {
                filterWithPriceRange("priceRange8",8);
            }
        };

        $scope.fnRange9 = function() {
            if($scope.range[9]) {
                filterWithPriceRange("priceRange9",9);
            }
        };

        $scope.fnRange10 = function() {
            if($scope.range[10]) {
                filterWithPriceRange("priceRange10",10);
            }
        };

        $scope.fnRange11 = function() {
            if($scope.range[11]) {
                filterWithPriceRange("priceRange11",11);
            }
        };

        $scope.fnRange12 = function() {
            if($scope.range[12]) {
                filterWithPriceRange("priceRange12",12);
            }
        };

        $scope.fnRange13 = function() {
            if($scope.range[13]) {
                filterWithPriceRange("priceRange13",13);
            }
        };

        $scope.fnRange14 = function() {
            if($scope.range[14]) {
                filterWithPriceRange("priceRange14",14);
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
            $scope.products = ProductService.getSearchResult();

            $http.post('/getInitialDicksProducts').
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    // ProductService.sharedObject = data;
                    if(data == "success") {
                        $http.post('/getDicksInitialResult').
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
