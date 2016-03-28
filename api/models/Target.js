/**
* Target.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true
        },
        name: {
            type: 'string'
        },
        category: {
            type: 'string'
        },
        img: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        price: {
            type: 'string'
        },
        rate: {
            type: 'string'
        },
        url: {
            type: 'string'
        },
        provider: {
            type: 'string'
        }
    }
};

