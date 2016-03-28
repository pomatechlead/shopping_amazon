/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
    //amazon routing define
    'get /amazon': {
      controller: 'AmazonController',
      action: 'index'
    },
    'post /getInitialAmazonProducts': {
        controller: 'AmazonController',
        action: 'initialList'
    },
    'post /getAmazonInitialResult': {
        controller: 'AmazonController',
        action: 'initialListResult'
    },
    'post /amazonProductSearch': {
        controller: 'AmazonController',
        action: 'searchWithString'
    },
    'get /amazon/detail/:productId': {
        controller: 'AmazonController',
        action: 'detailView'
    },
    'post /amazonProductFilter': {
        controller: 'AmazonController',
        action: 'productFilter'
    },
    'post /amazonProductSlideFilter': {
        controller: 'AmazonController',
        action: 'productSlideFilter'
    },

    //sportsauthority routing define
    '/sportsauthority': {
        controller: 'SportAuthorityController',
        action: 'index'
    },
    'post /getInitialSportAuthorityProducts': {
        controller: 'SportAuthorityController',
        action: 'initialList'
    },
    'post /getSportAuthorityInitialResult': {
        controller: 'SportAuthorityController',
        action: 'initialListResult'
    },
    'post /sportAuthorityProductSearch': {
        controller: 'SportAuthorityController',
        action: 'searchWithString'
    },
    'get /sportsauthority/detail/:productId': {
        controller: 'SportAuthorityController',
        action: 'detailView'
    },
    'post /sportsAuthorityProductFilter': {
        controller: 'SportAuthorityController',
        action: 'productFilter'
    },
    'post /sportsAuthorityProductSlideFilter': {
        controller: 'SportAuthorityController',
        action: 'productSlideFilter'
    },

    //dicks routing define
    '/dicks': {
        controller: 'DicksController',
        action: 'index'
    },
    'post /getInitialDicksProducts': {
        controller: 'DicksController',
        action: 'initialList'
    },
    'post /getDicksInitialResult': {
        controller: 'DicksController',
        action: 'initialListResult'
    },

    //target routing define
    '/target': {
        controller: 'TargetController',
        action: 'index'
    },
    'post /getInitialTargetProducts': {
        controller: 'TargetController',
        action: 'initialList'
    },
    'post /getTargetInitialResult': {
        controller: 'TargetController',
        action: 'initialListResult'
    },
    'post /targetProductSearch': {
        controller: 'TargetController',
        action: 'searchWithString'
    },
    'get /target/detail/:productId': {
        controller: 'TargetController',
        action: 'detailView'
    },
    'post /targetProductFilter': {
        controller: 'TargetController',
        action: 'productFilter'
    },
    'post /targetProductSlideFilter': {
        controller: 'TargetController',
        action: 'productSlideFilter'
    },

    //nodstrom routing define
    '/nodstrom': {
        controller: 'NodstromController',
        action: 'index'
    },
    'post /getInitialNodstromProducts': {
        controller: 'NodstromController',
        action: 'initialList'
    },
    'post /getNodstromInitialResult': {
        controller: 'NodstromController',
        action: 'initialListResult'
    },
    'post /nodstromProductSearch': {
        controller: 'NodstromController',
        action: 'searchWithString'
    },
    'get /nodstrom/detail/:productId': {
        controller: 'NodstromController',
        action: 'detailView'
    },
    'post /nodstromProductFilter': {
        controller: 'NodstromController',
        action: 'productFilter'
    },
    'post /nodstromProductSlideFilter': {
        controller: 'NodstromController',
        action: 'productSlideFilter'
    },

    //walmart routing define
    '/walmart': {
        controller: 'WalmartController',
        action: 'index'
    },
    'post /getInitialWalmartProducts': {
        controller: 'WalmartController',
        action: 'initialList'
    },
    'post /getWalmartInitialResult': {
        controller: 'WalmartController',
        action: 'initialListResult'
    },
    'post /walmartProductSearch': {
        controller: 'WalmartController',
        action: 'searchWithString'
    },
    'get /walmart/detail/:productId': {
        controller: 'WalmartController',
        action: 'detailView'
    },
    'post /walmartProductFilter': {
        controller: 'WalmartController',
        action: 'productFilter'
    },
    'post /walmartProductSlideFilter': {
        controller: 'WalmartController',
        action: 'productSlideFilter'
    },

    //costco routing define
    '/costco': {
        controller: 'CostcoController',
        action: 'index'
    },
    'post /getInitialCostcoProducts': {
        controller: 'CostcoController',
        action: 'initialList'
    },
    'post /getCostcoInitialResult': {
        controller: 'CostcoController',
        action: 'initialListResult'
    },
    'get /costco/detail/:productId': {
        controller: 'CostcoController',
        action: 'detailView'
    },

    //sams routing define
    '/sams': {
        controller: 'SamsController',
        action: 'index'
    },
    'post /getInitialSamsProducts': {
        controller: 'SamsController',
        action: 'initialList'
    },
    'post /getSamsInitialResult': {
        controller: 'SamsController',
        action: 'initialListResult'
    },
    'post /samsProductSearch': {
        controller: 'SamsController',
        action: 'searchWithString'
    },
    'get /sams/detail/:productId': {
        controller: 'SamsController',
        action: 'detailView'
    },
    'post /samsProductFilter': {
        controller: 'SamsController',
        action: 'productFilter'
    },
    'post /samsProductSlideFilter': {
        controller: 'SamsController',
        action: 'productSlideFilter'
    },

    //dell routing define
    '/dell': {
        controller: 'DellController',
        action: 'index'
    },
    'post /getInitialDellProducts': {
        controller: 'DellController',
        action: 'initialList'
    },
    'post /getDellInitialResult': {
        controller: 'DellController',
        action: 'initialListResult'
    },
    'post /productDetail': {
        controller: 'ProductsController',
        action: 'detailInfo'
    }

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
