/**
 * TargetController
 *
 * @description :: Server-side logic for managing Amazons
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var parseString = require('xml2js').parseString;
var requestObj = require("request");
var cheerio = require("cheerio");

module.exports = {
    index: function (req, res) {
        Target.destroy().exec(function deleteCB(err){
            if(err) {
                console.log(err);
            } else {
                res.view('target');
            }
        });
    },
    initialList: function (req, res) {
        //get data from target
        var urlTarget = "http://www.target.com/s?searchTerm=shoes&category=0%7CAll%7Cmatchallpartial%7Call+categories&lnk=snav_sbox_table";

        //get data from sams by httprequest
        requestObj({
            uri: urlTarget
        }, function(error, response, body) {
            var $ = cheerio.load(body);

            $("li.tile.standard").each(function() {
                var content = $(this);
                var img = "";
                if(content.find("a.productClick").find("img").attr("src") == undefined) {
                    img = content.find("a.productClick").find("img").attr("original");
                } else {
                    img = content.find("a.productClick").find("img").attr("src");
                }

                var name = content.find("a.productClick.productTitle").html();
                if(name == null) {
                    name = "";
                } else {
                    name = name;
                }

                var price = content.find("p.price.price-label").html();
                if(price == null) {
                    price = "";
                } else {
                    price = content.find("p.price.price-label").html().split("$");
                    price = price[1];
                }

                var url = content.find("a.productClick.productTitle").attr("href");
                if(url == null) {
                    url = "";
                } else {
                    url = url;
                }

                Target.create({
                    name : name,
                    img : img,
                    description : "",
                    price : price,
                    category : "shoes",
                    rate : "",
                    url: url,
                    provider : "target",
                    search: "shoes"
                }).exec(function(err, products) {
                    if (err) {return res.serverError(err);}
                });
            });

            res.jsonp("success");
        });
    },
    initialListResult: function (req, res) {
        Target.find().exec(function(err, products) {
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

        Target.destroy().exec(function deleteCB(err){
            if(err) {
                console.log(err);
            } else {
                console.log("Target delete!");
            }
        });

        //get data from target
        var urlTarget = "http://www.target.com/s?searchTerm=" + searchString + "&category=0%7CAll%7Cmatchallpartial%7Call+categories&lnk=snav_sbox_table";

        //get data from target
        requestObj({
            uri: urlTarget
        }, function(error, response, body) {
            var $ = cheerio.load(body);

            $("li.tile.standard").each(function() {
                var content = $(this);
                var img = "";
                if(content.find("a.productClick").find("img").attr("src") == undefined) {
                    img = content.find("a.productClick").find("img").attr("original");
                } else {
                    img = content.find("a.productClick").find("img").attr("src");
                }

                var name = content.find("a.productClick.productTitle").html();
                if(name == null) {
                    name = "";
                } else {
                    name = name;
                }

                var price = content.find("p.price.price-label").html();
                if(price == null) {
                    price = "";
                } else {
                    price = content.find("p.price.price-label").html().split("$");
                    price = price[1];
                }

                var url = content.find("a.productClick.productTitle").attr("href");
                if(url == null) {
                    url = "";
                } else {
                    url = url;
                }

                Target.create({
                    name : name,
                    img : img,
                    description : "",
                    price : price,
                    category : searchString,
                    rate : "",
                    url: url,
                    provider : "target",
                    search: searchString
                }).exec(function(err, products) {
                    if (err) {return res.serverError(err);}
                });
            });

            res.jsonp("success");
        });
    },
    detailView: function (req, res) {
        var productId = req.params.productId;
        var provider = "Target";
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
        Target.find({ price: { '>': parseInt(priceRange1), '<': parseInt(priceRange2) }}).exec(function(err, productList) {
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
        Target.find({ price: { '>': parseInt(priceRange1), '<': parseInt(priceRange2) }}).exec(function(err, productList) {
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

