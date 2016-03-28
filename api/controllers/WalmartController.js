/**
 * WalmartController
 *
 * @description :: Server-side logic for managing Amazons
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var parseString = require('xml2js').parseString;
var requestObj = require("request");
var cheerio = require("cheerio");

module.exports = {
    index: function (req, res) {
        Walmart.destroy().exec(function deleteCB(err){
            if(err) {
                console.log(err);
            } else {
                res.view('walmart');
            }
        });
    },
    initialList: function (req, res) {
        //get data from walmart api
        var http = require("http");
        urlWalmart = "http://api.walmartlabs.com/v1/search?query=shoes&format=xml&apiKey=htsv6yr5kzzsg2uum4ezk3b5";

        // get is a simple wrapper for request()
        // which sets the http method to GET
        var request = http.get(urlWalmart, function (response) {
            // data is streamed in chunks from the server
            // so we have to handle the "data" event
            var buffer = "",
                data,
                route;

            response.on("data", function (chunk) {
                buffer += chunk;
            });

            response.on("end", function (err) {
                parseString(buffer, function (err, result) {
                    for(var i = 0; i < result.searchresponse.items[0].item.length; i++) {
                        Walmart.create({
                            name : result.searchresponse.items[0].item[i].name[0],
                            img : result.searchresponse.items[0].item[i].thumbnailImage[0],
                            description : "",
                            price : result.searchresponse.items[0].item[i].salePrice[0],
                            category : "shoes",
                            rate : "",
                            url: result.searchresponse.items[0].item[i].productUrl[0],
                            provider : "walmart"
                        }).exec(function(err, products) {
                            if (err) {return res.serverError(err);}
                        });
                    }

                    res.jsonp("success");
                });
            });

        });
    },
    initialListResult: function (req, res) {
        Walmart.find().exec(function(err, products) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp(products);
            }
        });
    },
    searchWithString: function (req, res) {
        var searchString = req.param('searchString');

        Walmart.destroy().exec(function deleteCB(err){
            if(err) {
                console.log(err);
            } else {
                console.log("Walmart delete!");
            }
        });

        var http = require("http");
        urlWalmart = "http://api.walmartlabs.com/v1/search?query=" + searchString + "&format=xml&apiKey=htsv6yr5kzzsg2uum4ezk3b5";

        // get is a simple wrapper for request()
        // which sets the http method to GET
        var request = http.get(urlWalmart, function (response) {
            // data is streamed in chunks from the server
            // so we have to handle the "data" event
            var buffer = "",
                data,
                route;

            response.on("data", function (chunk) {
                buffer += chunk;
            });

            response.on("end", function (err) {
                parseString(buffer, function (err, result) {
                    for(var i = 0; i < result.searchresponse.items[0].item.length; i++) {
                        Walmart.create({
                            name : result.searchresponse.items[0].item[i].name[0],
                            img : result.searchresponse.items[0].item[i].thumbnailImage[0],
                            description : "",
                            price : result.searchresponse.items[0].item[i].salePrice[0],
                            category : searchString,
                            rate : "",
                            url: result.searchresponse.items[0].item[i].productUrl[0],
                            provider : "walmart"
                        }).exec(function(err, products) {
                            if (err) {return res.serverError(err);}
                        });
                    }

                    res.jsonp("success");
                });
            });

        });
    },
    detailView: function (req, res) {
        var productId = req.params.productId;
        var provider = "Walmart";
        res.view('detail', { id: productId, provider: provider });
    },
    productFilter: function (req, res) {
        var priceRange1;
        var priceRange2;
        var productFilterRange = req.param('priceRange');

        if(productFilterRange == "priceRange1") {
            priceRange1 = 0;
            priceRange2 = 10;
        } else if(productFilterRange == "priceRange2") {
            priceRange1 = 10;
            priceRange2 = 20;
        } else if(productFilterRange == "priceRange3") {
            priceRange1 = 20;
            priceRange2 = 50;
        } else if(productFilterRange == "priceRange4") {
            priceRange1 = 50;
            priceRange2 = 100;
        } else if(productFilterRange == "priceRange5") {
            priceRange1 = 100;
            priceRange2 = 150;
        } else if(productFilterRange == "priceRange6") {
            priceRange1 = 150;
            priceRange2 = 200;
        } else if(productFilterRange == "priceRange7") {
            priceRange1 = 200;
            priceRange2 = 250;
        } else if(productFilterRange == "priceRange8") {
            priceRange1 = 500;
            priceRange2 = 750;
        } else if(productFilterRange == "priceRange9") {
            priceRange1 = 750;
            priceRange2 = 1000;
        } else if(productFilterRange == "priceRange10") {
            priceRange1 = 1250;
            priceRange2 = 1500;
        } else if(productFilterRange == "priceRange11") {
            priceRange1 = 1500;
            priceRange2 = 2000;
        } else if(productFilterRange == "priceRange12") {
            priceRange1 = 2000;
            priceRange2 = 2500;
        } else if(productFilterRange == "priceRange13") {
            priceRange1 = 2500;
            priceRange2 = 3000;
        } else if(productFilterRange == "priceRange14") {
            priceRange1 = 3000;
            priceRange2 = 30000;
        }

        //find similar items
        Walmart.find({ price: { '>': parseInt(priceRange1), '<': parseInt(priceRange2) }}).exec(function(err, productList) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp(productList);
            }
        });
    },
    productSlideFilter: function (req, res) {
        var priceRange1 = req.param('price1');
        var priceRange2 = req.param('price2');

        //find similar items
        Walmart.find({ price: { '>': parseInt(priceRange1), '<': parseInt(priceRange2) }}).exec(function(err, productList) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp(productList);
            }
        });
    }
};

