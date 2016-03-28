/**
 * MacysController
 *
 * @description :: Server-side logic for managing Amazons
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var parseString = require('xml2js').parseString;
var requestObj = require("request");
var cheerio = require("cheerio");

module.exports = {
    index: function (req, res) {
        Macys.destroy().exec(function deleteCB(err){
            if(err) {
                console.log(err);
            } else {
                res.view('macys');
            }
        });
    },
    initialList: function (req, res) {
        //get data from sams
        urlMacys = "http://www1.macys.com/shop/search?keyword=shoes";

        //get data from sams by httprequest
        requestObj({
            uri: urlMacys
        }, function(error, response, body) {
            var $ = cheerio.load(body);

            $("li.productThumbnail").each(function() {
                var content = $(this);
                var img = content.find("img").attr("src");
                var name = content.find("div.shortDescription").find("a").html();
                var price = content.find("span.priceSale").html();

                Macys.create({
                    name : name,
                    img : img,
                    description : "",
                    price : price,
                    category : "shoes",
                    rate : "",
                    provider : "amazon"
                }).exec(function(err, products) {
                    if (err) {return res.serverError(err);}
                });
            });

            res.jsonp("success");
        });
    },
    initialListResult: function (req, res) {
        Macys.find().exec(function(err, products) {
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

        Amazon.destroy().exec(function deleteCB(err){
            if(err) {
                console.log(err);
            } else {
                console.log("Amazon delete!");
            }
        });

        //get data from sams
        urlAmazon = "http://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=" + searchString;

        requestObj({
            uri: urlAmazon
        }, function(error, response, body) {
            var $ = cheerio.load(body);

            $("li.s-result-item").each(function() {
                var content = $(this);
                var img = content.find("img").attr("src");
                var name = content.find("h2.a-size-base").html();
                var price = content.find("span.a-size-base").html();

                Amazon.create({
                    name : name,
                    img : img,
                    description : "",
                    price : price,
                    category : searchString,
                    rate : "",
                    provider : "amazon"
                }).exec(function(err, products) {
                    if (err) {return res.serverError(err);}
                });
            });

            res.jsonp("success");
        });
    }
};

