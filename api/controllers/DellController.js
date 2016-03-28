/**
 * DellController
 *
 * @description :: Server-side logic for managing Amazons
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var parseString = require('xml2js').parseString;
var requestObj = require("request");
var cheerio = require("cheerio");

module.exports = {
    index: function (req, res) {
        Dell.destroy().exec(function deleteCB(err){
            if(err) {
                console.log(err);
            } else {
                res.view('dell');
            }
        });
    },
    initialList: function (req, res) {
        //get data from sams
        urlDell = "http://pilot.search.dell.com/notebook";
        //get data from sams by httprequest
        requestObj({
            uri: urlDell
        }, function(error, response, body) {
            var $ = cheerio.load(body);

            $("li.unified-search-result").each(function() {
                var content = $(this);
                var img = content.find("img").attr("src");
                var name = content.find("a.dellmetrics-tclickthru.cft-title").find("h4").html();
                var price = content.find("div.price.pull-right").html();

                Dell.create({
                    name : name,
                    img : img,
                    description : "",
                    price : price,
                    category : "notebook",
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
        Dell.find().exec(function(err, products) {
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
                    category : 1,
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

