/**
 * DicksController
 *
 * @description :: Server-side logic for managing Dicks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var parseString = require('xml2js').parseString;
var requestObj = require("request");
var cheerio = require("cheerio");
var S = require('string');

module.exports = {
    index: function (req, res) {
        Dicks.destroy().exec(function deleteCB(err){
            if(err) {
                console.log(err);
            } else {
                res.view('dicks');
            }
        });
    },
    initialList: function (req, res) {
        //get data from dicks
        urlDicks = "http://www.dickssportinggoods.com/search/index.jsp?kwCatId=&kw=watch&origkw=watch&sr=1";

        //get data from dicks by httprequest
        requestObj({
            uri: urlDicks
        }, function(error, response, body) {
            var $ = cheerio.load(body);

            $("li.prod-item.avail-off").each(function() {
                var content = $(this);
                var img = "http://www.dickssportinggoods.com" + content.find("img").attr("src");
                var name = content.find("h2.prod-title").find("a").html();
                var price = content.find("div.ourPrice2").find("p").html();
                if(price == null) {
                    price = price;
                } else {
                    var priceSplit = price.split("$");
                    price = priceSplit[1];
                }
                var url = "http://www.dickssportinggoods.com" + content.find("h2.prod-title").find("a").attr("href");

                Dicks.create({
                    name : name,
                    img : img,
                    description : "",
                    price : price,
                    category : "watch",
                    rate : "",
                    url: url,
                    provider : "dicks"
                }).exec(function(err, products) {
                    if (err) {return res.serverError(err);}
                });
            });

            res.jsonp("success");
        });
    },
    initialListResult: function (req, res) {
        Dicks.find().exec(function(err, products) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp(products);
            }
        });
    }
};

