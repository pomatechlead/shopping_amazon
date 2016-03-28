var myApp = angular.module('myApp', [ 'ngRoute' ]);

myApp.factory("ProductService", function($rootScope){
    var searchResult = [];
    return {
        setSearchResult: function ( data ) {
            searchResult = data;
            $rootScope.$broadcast("productListChanged");
        },
        getSearchResult: function() {
            return searchResult;
        }
    };

});
//main controller define
myApp.controller('mainController',
    function($scope,$http, $rootScope, ProductService) {
        $scope.fnSearch = function() {
            //show loading gif file
            $scope.loading = true;

            var dataObj = { searchString: $scope.searchValue };
            $http.post('/productSearch', dataObj).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    if(data == "success") {
                        $http.post('/productSearchResults', dataObj).
                            success(function(data, status, headers, config) {
                                // this callback will be called asynchronously
                                // when the response is available
                                ProductService.setSearchResult(data);

                                //show loading gif file
                                $scope.loading = false;
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
    function($scope,$http,$timeout, ProductService) {
        $scope.products = [];
        $scope.productInit = function() {
            $scope.products = ProductService.getSearchResult();

            $http.post('/getAllProducts').
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    // ProductService.sharedObject = data;
                    ProductService.setSearchResult(data);
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

//product detail controller define
myApp.controller('productDetailController',
    function($scope,$http) {
        $scope.productDetailInit = function() {
            var productId = $("input[name='product-id']").val();

            var dataObj = { id: productId };
            $http.post('/productDetail', dataObj).
                success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    $scope.product = data[0];
                    console.log(data[0].img);

                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

        }
    }
);