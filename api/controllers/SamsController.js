/**
 * SamsController
 *
 * @description :: Server-side logic for managing Amazons
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var parseString = require('xml2js').parseString;
var requestObj = require("request");
var cheerio = require("cheerio");

module.exports = {
    index: function (req, res) {
        Sams.destroy().exec(function deleteCB(err){
            if(err) {
                console.log(err);
            } else {
                res.view('sams');
            }
        });
    },
    initialList: function (req, res) {
        //get data from sams
        urlSams = "http://www.samsclub.com/sams/search/searchResults.jsp?searchCategoryId=all&searchTerm=shoes&fromHome=no&_requestid=311311";

        //get data from sams by httprequest
        requestObj({
            uri: urlSams
        }, function(error, response, body) {
            var $ = cheerio.load(body);

            $("li.item").each(function() {
                var content = $(this);
                var img = content.find("img").attr("src");
                var name = content.find("a.itemtitle.sm-ellipsis").find("div").html();
                var price = content.find("span.price").html();
                var url = "http://www.samsclub.com" + content.find("a.itemtitle.sm-ellipsis").attr("href");

                Sams.create({
                    name : name,
                    img : img,
                    description : "",
                    price : price,
                    category : "shoes",
                    rate : "",
                    url: url,
                    provider : "sams"
                }).exec(function(err, products) {
                    if (err) {return res.serverError(err);}
                });
            });

            res.jsonp("success");
        });
    },
    initialListResult: function (req, res) {
        Sams.find().exec(function(err, products) {
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

        Sams.destroy().exec(function deleteCB(err){
            if(err) {
                console.log(err);
            } else {
                console.log("Sams delete!");
            }
        });

        //get data from sams
        urlSams = "http://www.samsclub.com/sams/search/searchResults.jsp?searchCategoryId=all&searchTerm=" + searchString + "&fromHome=no&_requestid=311311";

        //get data from sams by httprequest
        requestObj({
            uri: urlSams
        }, function(error, response, body) {
            var $ = cheerio.load(body);

            $("li.item").each(function() {
                var content = $(this);
                var img = content.find("img").attr("src");
                var name = content.find("a.itemtitle.sm-ellipsis").find("div").html();
                var price = content.find("span.price").html();
                var url = "http://www.samsclub.com" + content.find("a.itemtitle.sm-ellipsis").attr("href");

                Sams.create({
                    name : name,
                    img : img,
                    description : "",
                    price : price,
                    category : searchString,
                    rate : "",
                    url: url,
                    provider : "sams"
                }).exec(function(err, products) {
                    if (err) {return res.serverError(err);}
                });
            });

            res.jsonp("success");
        });
    },
    detailView: function (req, res) {
        var productId = req.params.productId;
        var provider = "Sams";
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
        Sams.find({ price: { '>': parseInt(priceRange1), '<': parseInt(priceRange2) }}).exec(function(err, productList) {
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
        Sams.find({ price: { '>': parseInt(priceRange1), '<': parseInt(priceRange2) }}).exec(function(err, productList) {
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

