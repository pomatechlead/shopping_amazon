/**
 * ProductsController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var parseString = require('xml2js').parseString;
var htmlparser = require("htmlparser2");
var Parser = require('parse5').Parser;
var requestObj = require("request");
var cheerio = require("cheerio");
var S = require('string');

module.exports = {
    detailInfo: function (req, res) {
        var searchSimilar = function(searchString,product,price1,price2) {
            Similar.destroy().exec(function deleteCB(err){
                if(err) {
                    console.log(err);
                } else {
                    console.log("Similar delete!");
                }
            });

            //get data from amazon
            urlAmazon = "http://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=" + searchString;

            requestObj({
                uri: urlAmazon
            }, function(error, response, body) {
                var $ = cheerio.load(body);

                $("li.s-result-item").each(function() {
                    var content = $(this);
                    var img = content.find("img").attr("src");
                    var name = content.find("h2.a-size-base").html();
                    if(name == null) {
                        name = content.find("h2.a-size-medium").html();
                    }
                    var price = content.find("span.a-size-base").html();
                    var url = content.find("a.a-link-normal").attr("href");

                    Similar.create({
                        name : name,
                        img : img,
                        description : "",
                        price : price,
                        category : searchString,
                        rate : "",
                        url: url,
                        provider : "amazon"
                    }).exec(function(err, products) {
                        if (err) {return res.serverError(err);}
                    });
                });
            });

            //get data from target
            var urlTarget = "http://www.target.com/s?searchTerm=" + searchString + "&category=0%7CAll%7Cmatchallpartial%7Call+categories&lnk=snav_sbox_table";

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

                    Similar.create({
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
            });

            //get data from nodstrom
            urlNodstrom = "https://www.nordstromrack.com/shop/search?query=" + searchString;

            requestObj({
                uri: urlNodstrom
            }, function(error, response, body) {
                var $ = cheerio.load(body);

                $("div.catalog-grid-cell").each(function() {
                    var content = $(this);
                    var img = content.find("img").attr("src");
                    var name = content.find("div.catalog-grid-product__title").html();
                    var price = content.find("span.catalog-grid-product__sale-price").html().split("$");
                    var url = "https://www.nordstromrack.com" + content.find("a.catalog-grid-product").attr("href");

                    Similar.create({
                        name : name,
                        img : img,
                        description : "",
                        price : price[1],
                        category : searchString,
                        rate : "",
                        url: url,
                        provider : "nodstrom"
                    }).exec(function(err, products) {
                        if (err) {return res.serverError(err);}
                    });
                });
            });

            //get data from walmart api
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
                            Similar.create({
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

                    });
                });

            });

            //get data from sportsauthority
            urlSportsAuthority = "http://shop.sportsauthority.com/search?w=" + searchString;

            //get data from sportsauthority by httprequest
            requestObj({
                uri: urlSportsAuthority
            }, function(error, response, body) {
                var $ = cheerio.load(body);

                $("div.sli_grid_result").each(function() {
                    var content = $(this);
                    var img = content.find("img").attr("src");
                    var name = content.find("h2.sli_grid_title.sli_h2").find("a").html();

                    var price;
                    if(content.find("h4.sli_grid_price_block").find("nobr").find("strong").html() == null) {
                        price = content.find("h4.sli_grid_price_block").find("nobr").html().split("$");
                    } else {
                        price = content.find("h4.sli_grid_price_block").find("nobr").find("strong").html().split("$");
                    }

                    var url = content.find("h2.sli_grid_title sli_h2").find("a").attr("href");

                    Similar.create({
                        name : name,
                        img : img,
                        description : "",
                        price : price[1],
                        category : searchString,
                        rate : "",
                        url: url,
                        provider : "sportauthority"
                    }).exec(function(err, products) {
                        if (err) {return res.serverError(err);}
                    });
                });

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

                    Similar.create({
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

                //find similar items
                Similar.find({ price: { '>': parseInt(price1), '<': parseInt(price2) }}).exec(function(err, productList) {
                    if (err) {
                        res.render('error', {
                            status: 500
                        });
                    } else {
                        var responseObj = { product: product, similarProduct: productList };
                        res.jsonp(responseObj);
                    }
                });

            });
        };
        var priceRange = function(price) {
            var priceRangeArr = [];
            //set start -  end range prices
            var integerPrice = parseInt(price);
            var devidedNumber = "1";
            for(var i = 0; i < S(integerPrice).length - 1; i++) {
                devidedNumber += "0";
            }
            var scopeFirstLitter = parseInt(integerPrice / parseInt(devidedNumber));
            var scopeSecondLitter = scopeFirstLitter + 1;

            var scope1Price = scopeFirstLitter;
            var scope2Price = scopeSecondLitter;
            for(var i = 0; i < S(integerPrice).length - 1; i++) {
                scope1Price += "0";
            }
            for(var i = 0; i < S(integerPrice).length - 1; i++) {
                scope2Price += "0";
            }

            priceRangeArr.push(scope1Price);
            priceRangeArr.push(scope2Price);

            return priceRangeArr;
        }

        //get product id from request prameters
        var productId = req.param('id');
        var provider = req.param('provider');

        if(provider == "Amazon") {
            Amazon.find({ where: { id: productId } }).exec(function(err, product) {
                if (err) {
                    res.render('error', {
                        status: 500
                    });
                } else {
                    var selectedProduct = product;
                    var price = product[0].price;
                    var searchString = product[0].category;
                    var priceScope = priceRange(price);

                    searchSimilar(searchString,selectedProduct,priceScope[0],priceScope[1]);
                }
            });
        } else if (provider == "Target") {
            Target.find({ where: { id: productId } }).exec(function(err, product) {
                if (err) {
                    res.render('error', {
                        status: 500
                    });
                } else {
                    var selectedProduct = product;
                    var price = product[0].price;
                    var searchString = product[0].category;

                    //get price scope from original price
                    var priceScope = priceRange(price);

                    //pulling similar items
                    searchSimilar(searchString,selectedProduct,priceScope[0],priceScope[1]);
                }
            });


        } else if (provider == "Nodstrom") {
            Nodstrom.find({ where: { id: productId } }).exec(function(err, product) {
                if (err) {
                    res.render('error', {
                        status: 500
                    });
                } else {
                    var selectedProduct = product;
                    var price = product[0].price;
                    var searchString = product[0].category;

                    //get price scope from original price
                    var priceScope = priceRange(price);

                    //pulling similar items
                    searchSimilar(searchString,selectedProduct,priceScope[0],priceScope[1]);
                }
            });
        }  else if (provider == "Walmart") {
            Walmart.find({ where: { id: productId } }).exec(function(err, product) {
                if (err) {
                    res.render('error', {
                        status: 500
                    });
                } else {
                    var selectedProduct = product;
                    var price = product[0].price;
                    var searchString = product[0].category;

                    //get price scope from original price
                    var priceScope = priceRange(price);

                    //pulling similar items
                    searchSimilar(searchString,selectedProduct,priceScope[0],priceScope[1]);
                }
            });
        } else if (provider == "SportsAuthority") {
            SportAuthority.find({ where: { id: productId } }).exec(function(err, product) {
                if (err) {
                    res.render('error', {
                        status: 500
                    });
                } else {
                    var selectedProduct = product;
                    var price = product[0].price;
                    var searchString = product[0].category;

                    //get price scope from original price
                    var priceScope = priceRange(price);

                    //pulling similar items
                    searchSimilar(searchString,selectedProduct,priceScope[0],priceScope[1]);
                }
            });
        } else if (provider == "Sams") {
            Sams.find({ where: { id: productId } }).exec(function(err, product) {
                if (err) {
                    res.render('error', {
                        status: 500
                    });
                } else {
                    var selectedProduct = product;
                    var price = product[0].price;
                    var searchString = product[0].category;

                    //get price scope from original price
                    var priceScope = priceRange(price);

                    //pulling similar items
                    searchSimilar(searchString,selectedProduct,priceScope[0],priceScope[1]);
                }
            });
        }

    }
};

