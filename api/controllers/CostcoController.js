/**
 * CostcoController
 *
 * @description :: Server-side logic for managing Amazons
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var parseString = require('xml2js').parseString;
var requestObj = require("request");
var cheerio = require("cheerio");

module.exports = {
    index: function (req, res) {
        Costco.destroy().exec(function deleteCB(err){
            if(err) {
                console.log(err);
            } else {
                res.view('costco');
            }
        });
    },
    initialList: function (req, res) {
        //get data from costco
        urlCostco = "http://www.costco.com/CatalogSearch?langId=-1&storeId=10301&catalogId=10701&keyword=shoes&sortBy=PriceMin%7C0";

        //get data from costco by httprequest
        requestObj({
            uri: urlCostco
        }, function(error, response, body) {
            var $ = cheerio.load(body);
            $("div.grid-4col").each(function() {
                console.log(content);
                var content = $(this);
                var img = content.find("img").attr("src");
                var name = content.find("span.short-desc").html();
                var price = "";

                Costco.create({
                    name : name,
                    img : img,
                    description : "",
                    price : price,
                    category : "shoes",
                    rate : "",
                    provider : "costco"
                }).exec(function(err, products) {
                    if (err) {return res.serverError(err);}
                });
            });

            res.jsonp("success");
        });
    },
    initialListResult: function (req, res) {
        Costco.find().exec(function(err, products) {
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

        Costco.destroy().exec(function deleteCB(err){
            if(err) {
                console.log(err);
            } else {
                console.log("Amazon delete!");
            }
        });

        //get data from costco
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
    },
    detailView: function (req, res) {
        var productId = req.params.productId;
        var provider = "Costco";
        res.view('detail', { id: productId, provider: provider });
    }
};

