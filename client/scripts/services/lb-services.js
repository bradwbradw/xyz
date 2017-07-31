// CommonJS package manager support
if (typeof module !== 'undefined' && typeof exports !== 'undefined' &&
  module.exports === exports) {
  // Export the *name* of this Angular module
  // Sample usage:
  //
  //   import lbServices from './lb-services';
  //   angular.module('app', [lbServices]);
  //
  module.exports = "lbServices";
}

(function(window, angular, urlBase) {
  'use strict';

//  var urlBase = "http://localhost:5005/api";
  var authHeader = 'authorization';

  function getHost(url) {
    var m = url.match(/^(?:https?:)?\/\/([^\/]+)/);
    return m ? m[1] : null;
  }
  // need to use the urlBase as the base to handle multiple
  // loopback servers behind a proxy/gateway where the host
  // would be the same.
  var urlBaseHost = getHost(urlBase) ? urlBase : location.host;

/**
 * @ngdoc overview
 * @name lbServices
 * @module
 * @description
 *
 * The `lbServices` module provides services for interacting with
 * the models exposed by the LoopBack server via the REST API.
 *
 */
  var module = angular.module("lbServices", ['ngResource']);

/**
 * @ngdoc object
 * @name lbServices.User
 * @header lbServices.User
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `User` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "User",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/Users/:id",
          { 'id': '@id' },
          {

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__findById__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Find a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$__findById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Users/:id/accessTokens/:fk",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__destroyById__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Delete a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "prototype$__destroyById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Users/:id/accessTokens/:fk",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__updateById__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Update a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$__updateById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Users/:id/accessTokens/:fk",
              method: "PUT",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__get__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Queries accessTokens of User.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$__get__accessTokens": {
              isArray: true,
              url: urlBase + "/Users/:id/accessTokens",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__create__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Creates a new instance in accessTokens of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$__create__accessTokens": {
              url: urlBase + "/Users/:id/accessTokens",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__delete__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Deletes all accessTokens of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "prototype$__delete__accessTokens": {
              url: urlBase + "/Users/:id/accessTokens",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$__count__accessTokens
             * @methodOf lbServices.User
             *
             * @description
             *
             * Counts accessTokens of User.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "prototype$__count__accessTokens": {
              url: urlBase + "/Users/:id/accessTokens/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#create
             * @methodOf lbServices.User
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/Users",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#createMany
             * @methodOf lbServices.User
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/Users",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#patchOrCreate
             * @methodOf lbServices.User
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "patchOrCreate": {
              url: urlBase + "/Users",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#replaceOrCreate
             * @methodOf lbServices.User
             *
             * @description
             *
             * Replace an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "replaceOrCreate": {
              url: urlBase + "/Users/replaceOrCreate",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#upsertWithWhere
             * @methodOf lbServices.User
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "upsertWithWhere": {
              url: urlBase + "/Users/upsertWithWhere",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#exists
             * @methodOf lbServices.User
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/Users/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#findById
             * @methodOf lbServices.User
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/Users/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#replaceById
             * @methodOf lbServices.User
             *
             * @description
             *
             * Replace attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "replaceById": {
              url: urlBase + "/Users/:id/replace",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#find
             * @methodOf lbServices.User
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/Users",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#findOne
             * @methodOf lbServices.User
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/Users/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#updateAll
             * @methodOf lbServices.User
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
            "updateAll": {
              url: urlBase + "/Users/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#deleteById
             * @methodOf lbServices.User
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/Users/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#count
             * @methodOf lbServices.User
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/Users/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$patchAttributes
             * @methodOf lbServices.User
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
            "prototype$patchAttributes": {
              url: urlBase + "/Users/:id",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#createChangeStream
             * @methodOf lbServices.User
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/Users/change-stream",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#login
             * @methodOf lbServices.User
             *
             * @description
             *
             * Login a user with username/email and password.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
             *   Default value: `user`.
             *
             *  - `rememberMe` - `boolean` - Whether the authentication credentials
             *     should be remembered in localStorage across app/browser restarts.
             *     Default: `true`.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The response body contains properties of the AccessToken created on login.
             * Depending on the value of `include` parameter, the body may contain additional properties:
             *   - `user` - `U+007BUserU+007D` - Data of the currently logged in user. (`include=user`)
             *
             */
            "login": {
              params: {
                include: 'user',
              },
              interceptor: {
                response: function(response) {
                  var accessToken = response.data;
                  LoopBackAuth.setUser(
                    accessToken.id, accessToken.userId, accessToken.user);
                  LoopBackAuth.rememberMe =
                    response.config.params.rememberMe !== false;
                  LoopBackAuth.save();
                  return response.resource;
                },
              },
              url: urlBase + "/Users/login",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#logout
             * @methodOf lbServices.User
             *
             * @description
             *
             * Logout a user with access token.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `access_token` – `{string=}` - Do not supply this argument, it is automatically extracted from request headers.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "logout": {
              interceptor: {
                response: function(response) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return response.resource;
                },
                responseError: function(responseError) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return responseError.resource;
                },
              },
              url: urlBase + "/Users/logout",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$verify
             * @methodOf lbServices.User
             *
             * @description
             *
             * Trigger user's identity verification with configured verifyOptions
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `verifyOptions` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "prototype$verify": {
              url: urlBase + "/Users/:id/verify",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#confirm
             * @methodOf lbServices.User
             *
             * @description
             *
             * Confirm a user registration with identity verification token.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `uid` – `{string}` -
             *
             *  - `token` – `{string}` -
             *
             *  - `redirect` – `{string=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "confirm": {
              url: urlBase + "/Users/confirm",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#resetPassword
             * @methodOf lbServices.User
             *
             * @description
             *
             * Reset password for a user with email.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "resetPassword": {
              url: urlBase + "/Users/reset",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#changePassword
             * @methodOf lbServices.User
             *
             * @description
             *
             * Change a user's password.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `id` – `{*=}` -
             *
             *  - `oldPassword` – `{string}` -
             *
             *  - `newPassword` – `{string}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "changePassword": {
              url: urlBase + "/Users/change-password",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#setPassword
             * @methodOf lbServices.User
             *
             * @description
             *
             * Reset user's password via a password-reset token.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `id` – `{*=}` -
             *
             *  - `newPassword` – `{string}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "setPassword": {
              url: urlBase + "/Users/reset-password",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.User#getCurrent
             * @methodOf lbServices.User
             *
             * @description
             *
             * Get data of the currently logged user. Fail with HTTP result 401
             * when there is no user logged in.
             *
             * @param {function(Object,Object)=} successCb
             *    Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *    `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             */
            'getCurrent': {
              url: urlBase + "/Users" + '/:id',
              method: 'GET',
              params: {
                id: function() {
                  var id = LoopBackAuth.currentUserId;
                  if (id == null) id = '__anonymous__';
                  return id;
                },
              },
              interceptor: {
                response: function(response) {
                  LoopBackAuth.currentUserData = response.data;
                  return response.resource;
                },
                responseError: function(responseError) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return $q.reject(responseError);
                },
              },
              __isGetCurrentUser__: true,
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.User#upsert
             * @methodOf lbServices.User
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
        R["upsert"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.User#updateOrCreate
             * @methodOf lbServices.User
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
        R["updateOrCreate"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.User#patchOrCreateWithWhere
             * @methodOf lbServices.User
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
        R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

            /**
             * @ngdoc method
             * @name lbServices.User#update
             * @methodOf lbServices.User
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.User#destroyById
             * @methodOf lbServices.User
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.User#removeById
             * @methodOf lbServices.User
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.User#prototype$updateAttributes
             * @methodOf lbServices.User
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - User id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `User` object.)
             * </em>
             */
        R["prototype$updateAttributes"] = R["prototype$patchAttributes"];

        /**
         * @ngdoc method
         * @name lbServices.User#getCachedCurrent
         * @methodOf lbServices.User
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.User#login} or
         * {@link lbServices.User#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A User instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.User#isAuthenticated
         * @methodOf lbServices.User
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.User#getCurrentId
         * @methodOf lbServices.User
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

        /**
        * @ngdoc property
        * @name lbServices.User#modelName
        * @propertyOf lbServices.User
        * @description
        * The name of the model represented by this $resource,
        * i.e. `User`.
        */
        R.modelName = "User";



        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Dj
 * @header lbServices.Dj
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Dj` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Dj",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/djs/:id",
          { 'id': '@id' },
          {

            /**
             * @ngdoc method
             * @name lbServices.Dj#prototype$__findById__accessTokens
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Find a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
            "prototype$__findById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/djs/:id/accessTokens/:fk",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#prototype$__destroyById__accessTokens
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Delete a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "prototype$__destroyById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/djs/:id/accessTokens/:fk",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#prototype$__updateById__accessTokens
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Update a related item by id for accessTokens.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             *  - `fk` – `{*}` - Foreign key for accessTokens
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
            "prototype$__updateById__accessTokens": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/djs/:id/accessTokens/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Dj.spaces.findById() instead.
            "prototype$__findById__spaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/djs/:id/spaces/:fk",
              method: "GET",
            },

            // INTERNAL. Use Dj.spaces.destroyById() instead.
            "prototype$__destroyById__spaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/djs/:id/spaces/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Dj.spaces.updateById() instead.
            "prototype$__updateById__spaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/djs/:id/spaces/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Dj.editableSpaces.findById() instead.
            "prototype$__findById__editableSpaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/djs/:id/editableSpaces/:fk",
              method: "GET",
            },

            // INTERNAL. Use Dj.editableSpaces.destroyById() instead.
            "prototype$__destroyById__editableSpaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/djs/:id/editableSpaces/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Dj.editableSpaces.updateById() instead.
            "prototype$__updateById__editableSpaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/djs/:id/editableSpaces/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Dj.editableSpaces.link() instead.
            "prototype$__link__editableSpaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/djs/:id/editableSpaces/rel/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Dj.editableSpaces.unlink() instead.
            "prototype$__unlink__editableSpaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/djs/:id/editableSpaces/rel/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Dj.editableSpaces.exists() instead.
            "prototype$__exists__editableSpaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/djs/:id/editableSpaces/rel/:fk",
              method: "HEAD",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#prototype$__get__accessTokens
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Queries accessTokens of dj.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
            "prototype$__get__accessTokens": {
              isArray: true,
              url: urlBase + "/djs/:id/accessTokens",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#prototype$__create__accessTokens
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Creates a new instance in accessTokens of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
            "prototype$__create__accessTokens": {
              url: urlBase + "/djs/:id/accessTokens",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#prototype$__delete__accessTokens
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Deletes all accessTokens of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "prototype$__delete__accessTokens": {
              url: urlBase + "/djs/:id/accessTokens",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#prototype$__count__accessTokens
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Counts accessTokens of dj.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "prototype$__count__accessTokens": {
              url: urlBase + "/djs/:id/accessTokens/count",
              method: "GET",
            },

            // INTERNAL. Use Dj.spaces() instead.
            "prototype$__get__spaces": {
              isArray: true,
              url: urlBase + "/djs/:id/spaces",
              method: "GET",
            },

            // INTERNAL. Use Dj.spaces.create() instead.
            "prototype$__create__spaces": {
              url: urlBase + "/djs/:id/spaces",
              method: "POST",
            },

            // INTERNAL. Use Dj.spaces.destroyAll() instead.
            "prototype$__delete__spaces": {
              url: urlBase + "/djs/:id/spaces",
              method: "DELETE",
            },

            // INTERNAL. Use Dj.spaces.count() instead.
            "prototype$__count__spaces": {
              url: urlBase + "/djs/:id/spaces/count",
              method: "GET",
            },

            // INTERNAL. Use Dj.editableSpaces() instead.
            "prototype$__get__editableSpaces": {
              isArray: true,
              url: urlBase + "/djs/:id/editableSpaces",
              method: "GET",
            },

            // INTERNAL. Use Dj.editableSpaces.create() instead.
            "prototype$__create__editableSpaces": {
              url: urlBase + "/djs/:id/editableSpaces",
              method: "POST",
            },

            // INTERNAL. Use Dj.editableSpaces.destroyAll() instead.
            "prototype$__delete__editableSpaces": {
              url: urlBase + "/djs/:id/editableSpaces",
              method: "DELETE",
            },

            // INTERNAL. Use Dj.editableSpaces.count() instead.
            "prototype$__count__editableSpaces": {
              url: urlBase + "/djs/:id/editableSpaces/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#create
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/djs",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#createMany
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/djs",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#patchOrCreate
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
            "patchOrCreate": {
              url: urlBase + "/djs",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#replaceOrCreate
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Replace an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
            "replaceOrCreate": {
              url: urlBase + "/djs/replaceOrCreate",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#upsertWithWhere
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
            "upsertWithWhere": {
              url: urlBase + "/djs/upsertWithWhere",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#exists
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/djs/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#findById
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/djs/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#replaceById
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Replace attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
            "replaceById": {
              url: urlBase + "/djs/:id/replace",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#find
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/djs",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#findOne
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/djs/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#updateAll
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
            "updateAll": {
              url: urlBase + "/djs/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#deleteById
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/djs/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#count
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/djs/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#prototype$patchAttributes
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
            "prototype$patchAttributes": {
              url: urlBase + "/djs/:id",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#createChangeStream
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/djs/change-stream",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#login
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Login a user with username/email and password.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `include` – `{string=}` - Related objects to include in the response. See the description of return value for more details.
             *   Default value: `user`.
             *
             *  - `rememberMe` - `boolean` - Whether the authentication credentials
             *     should be remembered in localStorage across app/browser restarts.
             *     Default: `true`.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * The response body contains properties of the AccessToken created on login.
             * Depending on the value of `include` parameter, the body may contain additional properties:
             *   - `user` - `U+007BUserU+007D` - Data of the currently logged in user. (`include=user`)
             *
             */
            "login": {
              params: {
                include: 'user',
              },
              interceptor: {
                response: function(response) {
                  var accessToken = response.data;
                  LoopBackAuth.setUser(
                    accessToken.id, accessToken.userId, accessToken.user);
                  LoopBackAuth.rememberMe =
                    response.config.params.rememberMe !== false;
                  LoopBackAuth.save();
                  return response.resource;
                },
              },
              url: urlBase + "/djs/login",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#logout
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Logout a user with access token.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `access_token` – `{string=}` - Do not supply this argument, it is automatically extracted from request headers.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "logout": {
              interceptor: {
                response: function(response) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return response.resource;
                },
                responseError: function(responseError) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return responseError.resource;
                },
              },
              url: urlBase + "/djs/logout",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#prototype$verify
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Trigger user's identity verification with configured verifyOptions
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `verifyOptions` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "prototype$verify": {
              url: urlBase + "/djs/:id/verify",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#confirm
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Confirm a user registration with identity verification token.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `uid` – `{string}` -
             *
             *  - `token` – `{string}` -
             *
             *  - `redirect` – `{string=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "confirm": {
              url: urlBase + "/djs/confirm",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#resetPassword
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Reset password for a user with email.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             * This method expects a subset of model properties as request parameters.
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "resetPassword": {
              url: urlBase + "/djs/reset",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#changePassword
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Change a user's password.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `id` – `{*=}` -
             *
             *  - `oldPassword` – `{string}` -
             *
             *  - `newPassword` – `{string}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "changePassword": {
              url: urlBase + "/djs/change-password",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#setPassword
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Reset user's password via a password-reset token.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `id` – `{*=}` -
             *
             *  - `newPassword` – `{string}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
            "setPassword": {
              url: urlBase + "/djs/reset-password",
              method: "POST",
            },

            // INTERNAL. Use Space.contributors.findById() instead.
            "::findById::Space::contributors": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Spaces/:id/contributors/:fk",
              method: "GET",
            },

            // INTERNAL. Use Space.contributors.destroyById() instead.
            "::destroyById::Space::contributors": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Spaces/:id/contributors/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Space.contributors.updateById() instead.
            "::updateById::Space::contributors": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Spaces/:id/contributors/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Space.contributors.link() instead.
            "::link::Space::contributors": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Spaces/:id/contributors/rel/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Space.contributors.unlink() instead.
            "::unlink::Space::contributors": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Spaces/:id/contributors/rel/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Space.contributors.exists() instead.
            "::exists::Space::contributors": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Spaces/:id/contributors/rel/:fk",
              method: "HEAD",
            },

            // INTERNAL. Use Space.owner() instead.
            "::get::Space::owner": {
              url: urlBase + "/Spaces/:id/owner",
              method: "GET",
            },

            // INTERNAL. Use Space.contributors() instead.
            "::get::Space::contributors": {
              isArray: true,
              url: urlBase + "/Spaces/:id/contributors",
              method: "GET",
            },

            // INTERNAL. Use Space.contributors.create() instead.
            "::create::Space::contributors": {
              url: urlBase + "/Spaces/:id/contributors",
              method: "POST",
            },

            // INTERNAL. Use Space.contributors.createMany() instead.
            "::createMany::Space::contributors": {
              isArray: true,
              url: urlBase + "/Spaces/:id/contributors",
              method: "POST",
            },

            // INTERNAL. Use Space.contributors.destroyAll() instead.
            "::delete::Space::contributors": {
              url: urlBase + "/Spaces/:id/contributors",
              method: "DELETE",
            },

            // INTERNAL. Use Space.contributors.count() instead.
            "::count::Space::contributors": {
              url: urlBase + "/Spaces/:id/contributors/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Dj#getCurrent
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Get data of the currently logged user. Fail with HTTP result 401
             * when there is no user logged in.
             *
             * @param {function(Object,Object)=} successCb
             *    Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *    `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             */
            'getCurrent': {
              url: urlBase + "/djs" + '/:id',
              method: 'GET',
              params: {
                id: function() {
                  var id = LoopBackAuth.currentUserId;
                  if (id == null) id = '__anonymous__';
                  return id;
                },
              },
              interceptor: {
                response: function(response) {
                  LoopBackAuth.currentUserData = response.data;
                  return response.resource;
                },
                responseError: function(responseError) {
                  LoopBackAuth.clearUser();
                  LoopBackAuth.clearStorage();
                  return $q.reject(responseError);
                },
              },
              __isGetCurrentUser__: true,
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.Dj#upsert
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
        R["upsert"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.Dj#updateOrCreate
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
        R["updateOrCreate"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.Dj#patchOrCreateWithWhere
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
        R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

            /**
             * @ngdoc method
             * @name lbServices.Dj#update
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.Dj#destroyById
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Dj#removeById
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Dj#prototype$updateAttributes
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
        R["prototype$updateAttributes"] = R["prototype$patchAttributes"];

        /**
         * @ngdoc method
         * @name lbServices.Dj#getCachedCurrent
         * @methodOf lbServices.Dj
         *
         * @description
         *
         * Get data of the currently logged user that was returned by the last
         * call to {@link lbServices.Dj#login} or
         * {@link lbServices.Dj#getCurrent}. Return null when there
         * is no user logged in or the data of the current user were not fetched
         * yet.
         *
         * @returns {Object} A Dj instance.
         */
        R.getCachedCurrent = function() {
          var data = LoopBackAuth.currentUserData;
          return data ? new R(data) : null;
        };

        /**
         * @ngdoc method
         * @name lbServices.Dj#isAuthenticated
         * @methodOf lbServices.Dj
         *
         * @returns {boolean} True if the current user is authenticated (logged in).
         */
        R.isAuthenticated = function() {
          return this.getCurrentId() != null;
        };

        /**
         * @ngdoc method
         * @name lbServices.Dj#getCurrentId
         * @methodOf lbServices.Dj
         *
         * @returns {Object} Id of the currently logged-in user or null.
         */
        R.getCurrentId = function() {
          return LoopBackAuth.currentUserId;
        };

        /**
        * @ngdoc property
        * @name lbServices.Dj#modelName
        * @propertyOf lbServices.Dj
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Dj`.
        */
        R.modelName = "Dj";

    /**
     * @ngdoc object
     * @name lbServices.Dj.spaces
     * @header lbServices.Dj.spaces
     * @object
     * @description
     *
     * The object `Dj.spaces` groups methods
     * manipulating `Space` instances related to `Dj`.
     *
     * Call {@link lbServices.Dj#spaces Dj.spaces()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Dj#spaces
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Queries spaces of dj.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
        R.spaces = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::get::Dj::spaces"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Dj.spaces#count
             * @methodOf lbServices.Dj.spaces
             *
             * @description
             *
             * Counts spaces of dj.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.spaces.count = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::count::Dj::spaces"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Dj.spaces#create
             * @methodOf lbServices.Dj.spaces
             *
             * @description
             *
             * Creates a new instance in spaces of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
        R.spaces.create = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::create::Dj::spaces"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Dj.spaces#createMany
             * @methodOf lbServices.Dj.spaces
             *
             * @description
             *
             * Creates a new instance in spaces of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
        R.spaces.createMany = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::createMany::Dj::spaces"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Dj.spaces#destroyAll
             * @methodOf lbServices.Dj.spaces
             *
             * @description
             *
             * Deletes all spaces of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.spaces.destroyAll = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::delete::Dj::spaces"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Dj.spaces#destroyById
             * @methodOf lbServices.Dj.spaces
             *
             * @description
             *
             * Delete a related item by id for spaces.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for spaces
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.spaces.destroyById = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::destroyById::Dj::spaces"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Dj.spaces#findById
             * @methodOf lbServices.Dj.spaces
             *
             * @description
             *
             * Find a related item by id for spaces.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for spaces
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
        R.spaces.findById = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::findById::Dj::spaces"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Dj.spaces#updateById
             * @methodOf lbServices.Dj.spaces
             *
             * @description
             *
             * Update a related item by id for spaces.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             *  - `fk` – `{*}` - Foreign key for spaces
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
        R.spaces.updateById = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::updateById::Dj::spaces"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Dj.editableSpaces
     * @header lbServices.Dj.editableSpaces
     * @object
     * @description
     *
     * The object `Dj.editableSpaces` groups methods
     * manipulating `Space` instances related to `Dj`.
     *
     * Call {@link lbServices.Dj#editableSpaces Dj.editableSpaces()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Dj#editableSpaces
             * @methodOf lbServices.Dj
             *
             * @description
             *
             * Queries editableSpaces of dj.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
        R.editableSpaces = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::get::Dj::editableSpaces"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Dj.editableSpaces#count
             * @methodOf lbServices.Dj.editableSpaces
             *
             * @description
             *
             * Counts editableSpaces of dj.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.editableSpaces.count = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::count::Dj::editableSpaces"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Dj.editableSpaces#create
             * @methodOf lbServices.Dj.editableSpaces
             *
             * @description
             *
             * Creates a new instance in editableSpaces of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
        R.editableSpaces.create = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::create::Dj::editableSpaces"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Dj.editableSpaces#createMany
             * @methodOf lbServices.Dj.editableSpaces
             *
             * @description
             *
             * Creates a new instance in editableSpaces of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
        R.editableSpaces.createMany = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::createMany::Dj::editableSpaces"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Dj.editableSpaces#destroyAll
             * @methodOf lbServices.Dj.editableSpaces
             *
             * @description
             *
             * Deletes all editableSpaces of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.editableSpaces.destroyAll = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::delete::Dj::editableSpaces"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Dj.editableSpaces#destroyById
             * @methodOf lbServices.Dj.editableSpaces
             *
             * @description
             *
             * Delete a related item by id for editableSpaces.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for editableSpaces
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.editableSpaces.destroyById = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::destroyById::Dj::editableSpaces"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Dj.editableSpaces#exists
             * @methodOf lbServices.Dj.editableSpaces
             *
             * @description
             *
             * Check the existence of editableSpaces relation to an item by id.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for editableSpaces
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
        R.editableSpaces.exists = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::exists::Dj::editableSpaces"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Dj.editableSpaces#findById
             * @methodOf lbServices.Dj.editableSpaces
             *
             * @description
             *
             * Find a related item by id for editableSpaces.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for editableSpaces
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
        R.editableSpaces.findById = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::findById::Dj::editableSpaces"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Dj.editableSpaces#link
             * @methodOf lbServices.Dj.editableSpaces
             *
             * @description
             *
             * Add a related item by id for editableSpaces.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             *  - `fk` – `{*}` - Foreign key for editableSpaces
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
        R.editableSpaces.link = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::link::Dj::editableSpaces"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Dj.editableSpaces#unlink
             * @methodOf lbServices.Dj.editableSpaces
             *
             * @description
             *
             * Remove the editableSpaces relation to an item by id.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for editableSpaces
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.editableSpaces.unlink = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::unlink::Dj::editableSpaces"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Dj.editableSpaces#updateById
             * @methodOf lbServices.Dj.editableSpaces
             *
             * @description
             *
             * Update a related item by id for editableSpaces.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - dj id
             *
             *  - `fk` – `{*}` - Foreign key for editableSpaces
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
        R.editableSpaces.updateById = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::updateById::Dj::editableSpaces"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Song
 * @header lbServices.Song
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Song` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Song",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/Songs/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use Song.Spaces.findById() instead.
            "prototype$__findById__Spaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Songs/:id/Spaces/:fk",
              method: "GET",
            },

            // INTERNAL. Use Song.Spaces.destroyById() instead.
            "prototype$__destroyById__Spaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Songs/:id/Spaces/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Song.Spaces.updateById() instead.
            "prototype$__updateById__Spaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Songs/:id/Spaces/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Song.Spaces.link() instead.
            "prototype$__link__Spaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Songs/:id/Spaces/rel/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Song.Spaces.unlink() instead.
            "prototype$__unlink__Spaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Songs/:id/Spaces/rel/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Song.Spaces.exists() instead.
            "prototype$__exists__Spaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Songs/:id/Spaces/rel/:fk",
              method: "HEAD",
            },

            // INTERNAL. Use Song.Spaces() instead.
            "prototype$__get__Spaces": {
              isArray: true,
              url: urlBase + "/Songs/:id/Spaces",
              method: "GET",
            },

            // INTERNAL. Use Song.Spaces.create() instead.
            "prototype$__create__Spaces": {
              url: urlBase + "/Songs/:id/Spaces",
              method: "POST",
            },

            // INTERNAL. Use Song.Spaces.destroyAll() instead.
            "prototype$__delete__Spaces": {
              url: urlBase + "/Songs/:id/Spaces",
              method: "DELETE",
            },

            // INTERNAL. Use Song.Spaces.count() instead.
            "prototype$__count__Spaces": {
              url: urlBase + "/Songs/:id/Spaces/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Song#create
             * @methodOf lbServices.Song
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Song` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/Songs",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Song#createMany
             * @methodOf lbServices.Song
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Song` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/Songs",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Song#patchOrCreate
             * @methodOf lbServices.Song
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Song` object.)
             * </em>
             */
            "patchOrCreate": {
              url: urlBase + "/Songs",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.Song#replaceOrCreate
             * @methodOf lbServices.Song
             *
             * @description
             *
             * Replace an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Song` object.)
             * </em>
             */
            "replaceOrCreate": {
              url: urlBase + "/Songs/replaceOrCreate",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Song#upsertWithWhere
             * @methodOf lbServices.Song
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Song` object.)
             * </em>
             */
            "upsertWithWhere": {
              url: urlBase + "/Songs/upsertWithWhere",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Song#exists
             * @methodOf lbServices.Song
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/Songs/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Song#findById
             * @methodOf lbServices.Song
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Song` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/Songs/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Song#replaceById
             * @methodOf lbServices.Song
             *
             * @description
             *
             * Replace attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Song` object.)
             * </em>
             */
            "replaceById": {
              url: urlBase + "/Songs/:id/replace",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Song#find
             * @methodOf lbServices.Song
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Song` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/Songs",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Song#findOne
             * @methodOf lbServices.Song
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Song` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/Songs/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Song#updateAll
             * @methodOf lbServices.Song
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
            "updateAll": {
              url: urlBase + "/Songs/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Song#deleteById
             * @methodOf lbServices.Song
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Song` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/Songs/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Song#count
             * @methodOf lbServices.Song
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/Songs/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Song#prototype$patchAttributes
             * @methodOf lbServices.Song
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Song id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Song` object.)
             * </em>
             */
            "prototype$patchAttributes": {
              url: urlBase + "/Songs/:id",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.Song#createChangeStream
             * @methodOf lbServices.Song
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/Songs/change-stream",
              method: "POST",
            },

            // INTERNAL. Use Space.songs.findById() instead.
            "::findById::Space::songs": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Spaces/:id/songs/:fk",
              method: "GET",
            },

            // INTERNAL. Use Space.songs.destroyById() instead.
            "::destroyById::Space::songs": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Spaces/:id/songs/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Space.songs.updateById() instead.
            "::updateById::Space::songs": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Spaces/:id/songs/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Space.songs.link() instead.
            "::link::Space::songs": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Spaces/:id/songs/rel/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Space.songs.unlink() instead.
            "::unlink::Space::songs": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Spaces/:id/songs/rel/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Space.songs.exists() instead.
            "::exists::Space::songs": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Spaces/:id/songs/rel/:fk",
              method: "HEAD",
            },

            // INTERNAL. Use Space.songs() instead.
            "::get::Space::songs": {
              isArray: true,
              url: urlBase + "/Spaces/:id/songs",
              method: "GET",
            },

            // INTERNAL. Use Space.songs.create() instead.
            "::create::Space::songs": {
              url: urlBase + "/Spaces/:id/songs",
              method: "POST",
            },

            // INTERNAL. Use Space.songs.createMany() instead.
            "::createMany::Space::songs": {
              isArray: true,
              url: urlBase + "/Spaces/:id/songs",
              method: "POST",
            },

            // INTERNAL. Use Space.songs.destroyAll() instead.
            "::delete::Space::songs": {
              url: urlBase + "/Spaces/:id/songs",
              method: "DELETE",
            },

            // INTERNAL. Use Space.songs.count() instead.
            "::count::Space::songs": {
              url: urlBase + "/Spaces/:id/songs/count",
              method: "GET",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.Song#upsert
             * @methodOf lbServices.Song
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Song` object.)
             * </em>
             */
        R["upsert"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.Song#updateOrCreate
             * @methodOf lbServices.Song
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Song` object.)
             * </em>
             */
        R["updateOrCreate"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.Song#patchOrCreateWithWhere
             * @methodOf lbServices.Song
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Song` object.)
             * </em>
             */
        R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

            /**
             * @ngdoc method
             * @name lbServices.Song#update
             * @methodOf lbServices.Song
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.Song#destroyById
             * @methodOf lbServices.Song
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Song` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Song#removeById
             * @methodOf lbServices.Song
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Song` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Song#prototype$updateAttributes
             * @methodOf lbServices.Song
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Song id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Song` object.)
             * </em>
             */
        R["prototype$updateAttributes"] = R["prototype$patchAttributes"];


        /**
        * @ngdoc property
        * @name lbServices.Song#modelName
        * @propertyOf lbServices.Song
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Song`.
        */
        R.modelName = "Song";

    /**
     * @ngdoc object
     * @name lbServices.Song.Spaces
     * @header lbServices.Song.Spaces
     * @object
     * @description
     *
     * The object `Song.Spaces` groups methods
     * manipulating `Space` instances related to `Song`.
     *
     * Call {@link lbServices.Song#Spaces Song.Spaces()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Song#Spaces
             * @methodOf lbServices.Song
             *
             * @description
             *
             * Queries Spaces of Song.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Song id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
        R.Spaces = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::get::Song::Spaces"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Song.Spaces#count
             * @methodOf lbServices.Song.Spaces
             *
             * @description
             *
             * Counts Spaces of Song.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Song id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.Spaces.count = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::count::Song::Spaces"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Song.Spaces#create
             * @methodOf lbServices.Song.Spaces
             *
             * @description
             *
             * Creates a new instance in Spaces of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Song id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
        R.Spaces.create = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::create::Song::Spaces"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Song.Spaces#createMany
             * @methodOf lbServices.Song.Spaces
             *
             * @description
             *
             * Creates a new instance in Spaces of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Song id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
        R.Spaces.createMany = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::createMany::Song::Spaces"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Song.Spaces#destroyAll
             * @methodOf lbServices.Song.Spaces
             *
             * @description
             *
             * Deletes all Spaces of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Song id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.Spaces.destroyAll = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::delete::Song::Spaces"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Song.Spaces#destroyById
             * @methodOf lbServices.Song.Spaces
             *
             * @description
             *
             * Delete a related item by id for Spaces.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Song id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for Spaces
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.Spaces.destroyById = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::destroyById::Song::Spaces"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Song.Spaces#exists
             * @methodOf lbServices.Song.Spaces
             *
             * @description
             *
             * Check the existence of Spaces relation to an item by id.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Song id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for Spaces
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
        R.Spaces.exists = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::exists::Song::Spaces"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Song.Spaces#findById
             * @methodOf lbServices.Song.Spaces
             *
             * @description
             *
             * Find a related item by id for Spaces.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Song id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for Spaces
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
        R.Spaces.findById = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::findById::Song::Spaces"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Song.Spaces#link
             * @methodOf lbServices.Song.Spaces
             *
             * @description
             *
             * Add a related item by id for Spaces.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Song id
             *
             *  - `fk` – `{*}` - Foreign key for Spaces
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
        R.Spaces.link = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::link::Song::Spaces"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Song.Spaces#unlink
             * @methodOf lbServices.Song.Spaces
             *
             * @description
             *
             * Remove the Spaces relation to an item by id.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Song id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for Spaces
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.Spaces.unlink = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::unlink::Song::Spaces"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Song.Spaces#updateById
             * @methodOf lbServices.Song.Spaces
             *
             * @description
             *
             * Update a related item by id for Spaces.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Song id
             *
             *  - `fk` – `{*}` - Foreign key for Spaces
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
        R.Spaces.updateById = function() {
          var TargetResource = $injector.get("Space");
          var action = TargetResource["::updateById::Song::Spaces"];
          return action.apply(R, arguments);
        };


        return R;
      }]);

/**
 * @ngdoc object
 * @name lbServices.Space
 * @header lbServices.Space
 * @object
 *
 * @description
 *
 * A $resource object for interacting with the `Space` model.
 *
 * ## Example
 *
 * See
 * {@link http://docs.angularjs.org/api/ngResource.$resource#example $resource}
 * for an example of using this object.
 *
 */
  module.factory(
    "Space",
    [
      'LoopBackResource', 'LoopBackAuth', '$injector', '$q',
      function(LoopBackResource, LoopBackAuth, $injector, $q) {
        var R = LoopBackResource(
        urlBase + "/Spaces/:id",
          { 'id': '@id' },
          {

            // INTERNAL. Use Space.songs.findById() instead.
            "prototype$__findById__songs": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Spaces/:id/songs/:fk",
              method: "GET",
            },

            // INTERNAL. Use Space.songs.destroyById() instead.
            "prototype$__destroyById__songs": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Spaces/:id/songs/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Space.songs.updateById() instead.
            "prototype$__updateById__songs": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Spaces/:id/songs/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Space.songs.link() instead.
            "prototype$__link__songs": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Spaces/:id/songs/rel/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Space.songs.unlink() instead.
            "prototype$__unlink__songs": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Spaces/:id/songs/rel/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Space.songs.exists() instead.
            "prototype$__exists__songs": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Spaces/:id/songs/rel/:fk",
              method: "HEAD",
            },

            // INTERNAL. Use Space.contributors.findById() instead.
            "prototype$__findById__contributors": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Spaces/:id/contributors/:fk",
              method: "GET",
            },

            // INTERNAL. Use Space.contributors.destroyById() instead.
            "prototype$__destroyById__contributors": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Spaces/:id/contributors/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Space.contributors.updateById() instead.
            "prototype$__updateById__contributors": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Spaces/:id/contributors/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Space.contributors.link() instead.
            "prototype$__link__contributors": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Spaces/:id/contributors/rel/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Space.contributors.unlink() instead.
            "prototype$__unlink__contributors": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Spaces/:id/contributors/rel/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Space.contributors.exists() instead.
            "prototype$__exists__contributors": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Spaces/:id/contributors/rel/:fk",
              method: "HEAD",
            },

            // INTERNAL. Use Space.owner() instead.
            "prototype$__get__owner": {
              url: urlBase + "/Spaces/:id/owner",
              method: "GET",
            },

            // INTERNAL. Use Space.songs() instead.
            "prototype$__get__songs": {
              isArray: true,
              url: urlBase + "/Spaces/:id/songs",
              method: "GET",
            },

            // INTERNAL. Use Space.songs.create() instead.
            "prototype$__create__songs": {
              url: urlBase + "/Spaces/:id/songs",
              method: "POST",
            },

            // INTERNAL. Use Space.songs.destroyAll() instead.
            "prototype$__delete__songs": {
              url: urlBase + "/Spaces/:id/songs",
              method: "DELETE",
            },

            // INTERNAL. Use Space.songs.count() instead.
            "prototype$__count__songs": {
              url: urlBase + "/Spaces/:id/songs/count",
              method: "GET",
            },

            // INTERNAL. Use Space.contributors() instead.
            "prototype$__get__contributors": {
              isArray: true,
              url: urlBase + "/Spaces/:id/contributors",
              method: "GET",
            },

            // INTERNAL. Use Space.contributors.create() instead.
            "prototype$__create__contributors": {
              url: urlBase + "/Spaces/:id/contributors",
              method: "POST",
            },

            // INTERNAL. Use Space.contributors.destroyAll() instead.
            "prototype$__delete__contributors": {
              url: urlBase + "/Spaces/:id/contributors",
              method: "DELETE",
            },

            // INTERNAL. Use Space.contributors.count() instead.
            "prototype$__count__contributors": {
              url: urlBase + "/Spaces/:id/contributors/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Space#create
             * @methodOf lbServices.Space
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
            "create": {
              url: urlBase + "/Spaces",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Space#createMany
             * @methodOf lbServices.Space
             *
             * @description
             *
             * Create a new instance of the model and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
            "createMany": {
              isArray: true,
              url: urlBase + "/Spaces",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Space#patchOrCreate
             * @methodOf lbServices.Space
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
            "patchOrCreate": {
              url: urlBase + "/Spaces",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.Space#replaceOrCreate
             * @methodOf lbServices.Space
             *
             * @description
             *
             * Replace an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
            "replaceOrCreate": {
              url: urlBase + "/Spaces/replaceOrCreate",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Space#upsertWithWhere
             * @methodOf lbServices.Space
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
            "upsertWithWhere": {
              url: urlBase + "/Spaces/upsertWithWhere",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Space#exists
             * @methodOf lbServices.Space
             *
             * @description
             *
             * Check whether a model instance exists in the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `exists` – `{boolean=}` -
             */
            "exists": {
              url: urlBase + "/Spaces/:id/exists",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Space#findById
             * @methodOf lbServices.Space
             *
             * @description
             *
             * Find a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `filter` – `{object=}` - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
            "findById": {
              url: urlBase + "/Spaces/:id",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Space#replaceById
             * @methodOf lbServices.Space
             *
             * @description
             *
             * Replace attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
            "replaceById": {
              url: urlBase + "/Spaces/:id/replace",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Space#find
             * @methodOf lbServices.Space
             *
             * @description
             *
             * Find all instances of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
            "find": {
              isArray: true,
              url: urlBase + "/Spaces",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Space#findOne
             * @methodOf lbServices.Space
             *
             * @description
             *
             * Find first instance of the model matched by filter from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `filter` – `{object=}` - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
            "findOne": {
              url: urlBase + "/Spaces/findOne",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Space#updateAll
             * @methodOf lbServices.Space
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
            "updateAll": {
              url: urlBase + "/Spaces/update",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Space#deleteById
             * @methodOf lbServices.Space
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
            "deleteById": {
              url: urlBase + "/Spaces/:id",
              method: "DELETE",
            },

            /**
             * @ngdoc method
             * @name lbServices.Space#count
             * @methodOf lbServices.Space
             *
             * @description
             *
             * Count instances of the model matched by where from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
            "count": {
              url: urlBase + "/Spaces/count",
              method: "GET",
            },

            /**
             * @ngdoc method
             * @name lbServices.Space#prototype$patchAttributes
             * @methodOf lbServices.Space
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Space id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
            "prototype$patchAttributes": {
              url: urlBase + "/Spaces/:id",
              method: "PATCH",
            },

            /**
             * @ngdoc method
             * @name lbServices.Space#createChangeStream
             * @methodOf lbServices.Space
             *
             * @description
             *
             * Create a change stream.
             *
             * @param {Object=} parameters Request parameters.
             *
             *   This method does not accept any parameters.
             *   Supply an empty object or omit this argument altogether.
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `changes` – `{ReadableStream=}` -
             */
            "createChangeStream": {
              url: urlBase + "/Spaces/change-stream",
              method: "POST",
            },

            /**
             * @ngdoc method
             * @name lbServices.Space#playlist
             * @methodOf lbServices.Space
             *
             * @description
             *
             * <em>
             * (The remote method definition does not provide any description.)
             * </em>
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `spaceId` – `{string=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `playlist` – `{string=}` -
             */
            "playlist": {
              url: urlBase + "/Spaces/playlist",
              method: "GET",
            },

            // INTERNAL. Use Dj.spaces.findById() instead.
            "::findById::Dj::spaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/djs/:id/spaces/:fk",
              method: "GET",
            },

            // INTERNAL. Use Dj.spaces.destroyById() instead.
            "::destroyById::Dj::spaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/djs/:id/spaces/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Dj.spaces.updateById() instead.
            "::updateById::Dj::spaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/djs/:id/spaces/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Dj.editableSpaces.findById() instead.
            "::findById::Dj::editableSpaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/djs/:id/editableSpaces/:fk",
              method: "GET",
            },

            // INTERNAL. Use Dj.editableSpaces.destroyById() instead.
            "::destroyById::Dj::editableSpaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/djs/:id/editableSpaces/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Dj.editableSpaces.updateById() instead.
            "::updateById::Dj::editableSpaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/djs/:id/editableSpaces/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Dj.editableSpaces.link() instead.
            "::link::Dj::editableSpaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/djs/:id/editableSpaces/rel/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Dj.editableSpaces.unlink() instead.
            "::unlink::Dj::editableSpaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/djs/:id/editableSpaces/rel/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Dj.editableSpaces.exists() instead.
            "::exists::Dj::editableSpaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/djs/:id/editableSpaces/rel/:fk",
              method: "HEAD",
            },

            // INTERNAL. Use Dj.spaces() instead.
            "::get::Dj::spaces": {
              isArray: true,
              url: urlBase + "/djs/:id/spaces",
              method: "GET",
            },

            // INTERNAL. Use Dj.spaces.create() instead.
            "::create::Dj::spaces": {
              url: urlBase + "/djs/:id/spaces",
              method: "POST",
            },

            // INTERNAL. Use Dj.spaces.createMany() instead.
            "::createMany::Dj::spaces": {
              isArray: true,
              url: urlBase + "/djs/:id/spaces",
              method: "POST",
            },

            // INTERNAL. Use Dj.spaces.destroyAll() instead.
            "::delete::Dj::spaces": {
              url: urlBase + "/djs/:id/spaces",
              method: "DELETE",
            },

            // INTERNAL. Use Dj.spaces.count() instead.
            "::count::Dj::spaces": {
              url: urlBase + "/djs/:id/spaces/count",
              method: "GET",
            },

            // INTERNAL. Use Dj.editableSpaces() instead.
            "::get::Dj::editableSpaces": {
              isArray: true,
              url: urlBase + "/djs/:id/editableSpaces",
              method: "GET",
            },

            // INTERNAL. Use Dj.editableSpaces.create() instead.
            "::create::Dj::editableSpaces": {
              url: urlBase + "/djs/:id/editableSpaces",
              method: "POST",
            },

            // INTERNAL. Use Dj.editableSpaces.createMany() instead.
            "::createMany::Dj::editableSpaces": {
              isArray: true,
              url: urlBase + "/djs/:id/editableSpaces",
              method: "POST",
            },

            // INTERNAL. Use Dj.editableSpaces.destroyAll() instead.
            "::delete::Dj::editableSpaces": {
              url: urlBase + "/djs/:id/editableSpaces",
              method: "DELETE",
            },

            // INTERNAL. Use Dj.editableSpaces.count() instead.
            "::count::Dj::editableSpaces": {
              url: urlBase + "/djs/:id/editableSpaces/count",
              method: "GET",
            },

            // INTERNAL. Use Song.Spaces.findById() instead.
            "::findById::Song::Spaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Songs/:id/Spaces/:fk",
              method: "GET",
            },

            // INTERNAL. Use Song.Spaces.destroyById() instead.
            "::destroyById::Song::Spaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Songs/:id/Spaces/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Song.Spaces.updateById() instead.
            "::updateById::Song::Spaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Songs/:id/Spaces/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Song.Spaces.link() instead.
            "::link::Song::Spaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Songs/:id/Spaces/rel/:fk",
              method: "PUT",
            },

            // INTERNAL. Use Song.Spaces.unlink() instead.
            "::unlink::Song::Spaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Songs/:id/Spaces/rel/:fk",
              method: "DELETE",
            },

            // INTERNAL. Use Song.Spaces.exists() instead.
            "::exists::Song::Spaces": {
              params: {
                'fk': '@fk',
              },
              url: urlBase + "/Songs/:id/Spaces/rel/:fk",
              method: "HEAD",
            },

            // INTERNAL. Use Song.Spaces() instead.
            "::get::Song::Spaces": {
              isArray: true,
              url: urlBase + "/Songs/:id/Spaces",
              method: "GET",
            },

            // INTERNAL. Use Song.Spaces.create() instead.
            "::create::Song::Spaces": {
              url: urlBase + "/Songs/:id/Spaces",
              method: "POST",
            },

            // INTERNAL. Use Song.Spaces.createMany() instead.
            "::createMany::Song::Spaces": {
              isArray: true,
              url: urlBase + "/Songs/:id/Spaces",
              method: "POST",
            },

            // INTERNAL. Use Song.Spaces.destroyAll() instead.
            "::delete::Song::Spaces": {
              url: urlBase + "/Songs/:id/Spaces",
              method: "DELETE",
            },

            // INTERNAL. Use Song.Spaces.count() instead.
            "::count::Song::Spaces": {
              url: urlBase + "/Songs/:id/Spaces/count",
              method: "GET",
            },
          }
        );



            /**
             * @ngdoc method
             * @name lbServices.Space#upsert
             * @methodOf lbServices.Space
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
        R["upsert"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.Space#updateOrCreate
             * @methodOf lbServices.Space
             *
             * @description
             *
             * Patch an existing model instance or insert a new one into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `data` – `{object=}` - Model instance data
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
        R["updateOrCreate"] = R["patchOrCreate"];

            /**
             * @ngdoc method
             * @name lbServices.Space#patchOrCreateWithWhere
             * @methodOf lbServices.Space
             *
             * @description
             *
             * Update an existing model instance or insert a new one into the data source based on the where criteria.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
        R["patchOrCreateWithWhere"] = R["upsertWithWhere"];

            /**
             * @ngdoc method
             * @name lbServices.Space#update
             * @methodOf lbServices.Space
             *
             * @description
             *
             * Update instances of the model matched by {{where}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             * @param {Object} postData Request data.
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Information related to the outcome of the operation
             */
        R["update"] = R["updateAll"];

            /**
             * @ngdoc method
             * @name lbServices.Space#destroyById
             * @methodOf lbServices.Space
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
        R["destroyById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Space#removeById
             * @methodOf lbServices.Space
             *
             * @description
             *
             * Delete a model instance by {{id}} from the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Model id
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
        R["removeById"] = R["deleteById"];

            /**
             * @ngdoc method
             * @name lbServices.Space#prototype$updateAttributes
             * @methodOf lbServices.Space
             *
             * @description
             *
             * Patch attributes for a model instance and persist it into the data source.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Space id
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` - An object of model property name/value pairs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Space` object.)
             * </em>
             */
        R["prototype$updateAttributes"] = R["prototype$patchAttributes"];


        /**
        * @ngdoc property
        * @name lbServices.Space#modelName
        * @propertyOf lbServices.Space
        * @description
        * The name of the model represented by this $resource,
        * i.e. `Space`.
        */
        R.modelName = "Space";

    /**
     * @ngdoc object
     * @name lbServices.Space.songs
     * @header lbServices.Space.songs
     * @object
     * @description
     *
     * The object `Space.songs` groups methods
     * manipulating `Song` instances related to `Space`.
     *
     * Call {@link lbServices.Space#songs Space.songs()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Space#songs
             * @methodOf lbServices.Space
             *
             * @description
             *
             * Queries songs of Space.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Space id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Song` object.)
             * </em>
             */
        R.songs = function() {
          var TargetResource = $injector.get("Song");
          var action = TargetResource["::get::Space::songs"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Space.songs#count
             * @methodOf lbServices.Space.songs
             *
             * @description
             *
             * Counts songs of Space.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Space id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.songs.count = function() {
          var TargetResource = $injector.get("Song");
          var action = TargetResource["::count::Space::songs"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Space.songs#create
             * @methodOf lbServices.Space.songs
             *
             * @description
             *
             * Creates a new instance in songs of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Space id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Song` object.)
             * </em>
             */
        R.songs.create = function() {
          var TargetResource = $injector.get("Song");
          var action = TargetResource["::create::Space::songs"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Space.songs#createMany
             * @methodOf lbServices.Space.songs
             *
             * @description
             *
             * Creates a new instance in songs of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Space id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Song` object.)
             * </em>
             */
        R.songs.createMany = function() {
          var TargetResource = $injector.get("Song");
          var action = TargetResource["::createMany::Space::songs"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Space.songs#destroyAll
             * @methodOf lbServices.Space.songs
             *
             * @description
             *
             * Deletes all songs of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Space id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.songs.destroyAll = function() {
          var TargetResource = $injector.get("Song");
          var action = TargetResource["::delete::Space::songs"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Space.songs#destroyById
             * @methodOf lbServices.Space.songs
             *
             * @description
             *
             * Delete a related item by id for songs.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Space id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for songs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.songs.destroyById = function() {
          var TargetResource = $injector.get("Song");
          var action = TargetResource["::destroyById::Space::songs"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Space.songs#exists
             * @methodOf lbServices.Space.songs
             *
             * @description
             *
             * Check the existence of songs relation to an item by id.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Space id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for songs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Song` object.)
             * </em>
             */
        R.songs.exists = function() {
          var TargetResource = $injector.get("Song");
          var action = TargetResource["::exists::Space::songs"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Space.songs#findById
             * @methodOf lbServices.Space.songs
             *
             * @description
             *
             * Find a related item by id for songs.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Space id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for songs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Song` object.)
             * </em>
             */
        R.songs.findById = function() {
          var TargetResource = $injector.get("Song");
          var action = TargetResource["::findById::Space::songs"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Space.songs#link
             * @methodOf lbServices.Space.songs
             *
             * @description
             *
             * Add a related item by id for songs.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Space id
             *
             *  - `fk` – `{*}` - Foreign key for songs
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Song` object.)
             * </em>
             */
        R.songs.link = function() {
          var TargetResource = $injector.get("Song");
          var action = TargetResource["::link::Space::songs"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Space.songs#unlink
             * @methodOf lbServices.Space.songs
             *
             * @description
             *
             * Remove the songs relation to an item by id.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Space id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for songs
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.songs.unlink = function() {
          var TargetResource = $injector.get("Song");
          var action = TargetResource["::unlink::Space::songs"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Space.songs#updateById
             * @methodOf lbServices.Space.songs
             *
             * @description
             *
             * Update a related item by id for songs.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Space id
             *
             *  - `fk` – `{*}` - Foreign key for songs
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Song` object.)
             * </em>
             */
        R.songs.updateById = function() {
          var TargetResource = $injector.get("Song");
          var action = TargetResource["::updateById::Space::songs"];
          return action.apply(R, arguments);
        };
    /**
     * @ngdoc object
     * @name lbServices.Space.contributors
     * @header lbServices.Space.contributors
     * @object
     * @description
     *
     * The object `Space.contributors` groups methods
     * manipulating `Dj` instances related to `Space`.
     *
     * Call {@link lbServices.Space#contributors Space.contributors()}
     * to query all related instances.
     */


            /**
             * @ngdoc method
             * @name lbServices.Space#contributors
             * @methodOf lbServices.Space
             *
             * @description
             *
             * Queries contributors of Space.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Space id
             *
             *  - `options` – `{object=}` -
             *
             *  - `filter` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
        R.contributors = function() {
          var TargetResource = $injector.get("Dj");
          var action = TargetResource["::get::Space::contributors"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Space.contributors#count
             * @methodOf lbServices.Space.contributors
             *
             * @description
             *
             * Counts contributors of Space.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Space id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` - Criteria to match model instances
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * Data properties:
             *
             *  - `count` – `{number=}` -
             */
        R.contributors.count = function() {
          var TargetResource = $injector.get("Dj");
          var action = TargetResource["::count::Space::contributors"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Space.contributors#create
             * @methodOf lbServices.Space.contributors
             *
             * @description
             *
             * Creates a new instance in contributors of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Space id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
        R.contributors.create = function() {
          var TargetResource = $injector.get("Dj");
          var action = TargetResource["::create::Space::contributors"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Space.contributors#createMany
             * @methodOf lbServices.Space.contributors
             *
             * @description
             *
             * Creates a new instance in contributors of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Space id
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Array.<Object>,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Array.<Object>} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
        R.contributors.createMany = function() {
          var TargetResource = $injector.get("Dj");
          var action = TargetResource["::createMany::Space::contributors"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Space.contributors#destroyAll
             * @methodOf lbServices.Space.contributors
             *
             * @description
             *
             * Deletes all contributors of this model.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Space id
             *
             *  - `options` – `{object=}` -
             *
             *  - `where` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.contributors.destroyAll = function() {
          var TargetResource = $injector.get("Dj");
          var action = TargetResource["::delete::Space::contributors"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Space.contributors#destroyById
             * @methodOf lbServices.Space.contributors
             *
             * @description
             *
             * Delete a related item by id for contributors.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Space id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for contributors
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.contributors.destroyById = function() {
          var TargetResource = $injector.get("Dj");
          var action = TargetResource["::destroyById::Space::contributors"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Space.contributors#exists
             * @methodOf lbServices.Space.contributors
             *
             * @description
             *
             * Check the existence of contributors relation to an item by id.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Space id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for contributors
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
        R.contributors.exists = function() {
          var TargetResource = $injector.get("Dj");
          var action = TargetResource["::exists::Space::contributors"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Space.contributors#findById
             * @methodOf lbServices.Space.contributors
             *
             * @description
             *
             * Find a related item by id for contributors.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Space id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for contributors
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
        R.contributors.findById = function() {
          var TargetResource = $injector.get("Dj");
          var action = TargetResource["::findById::Space::contributors"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Space.contributors#link
             * @methodOf lbServices.Space.contributors
             *
             * @description
             *
             * Add a related item by id for contributors.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Space id
             *
             *  - `fk` – `{*}` - Foreign key for contributors
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
        R.contributors.link = function() {
          var TargetResource = $injector.get("Dj");
          var action = TargetResource["::link::Space::contributors"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Space.contributors#unlink
             * @methodOf lbServices.Space.contributors
             *
             * @description
             *
             * Remove the contributors relation to an item by id.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Space id
             *
             *  - `options` – `{object=}` -
             *
             *  - `fk` – `{*}` - Foreign key for contributors
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * This method returns no data.
             */
        R.contributors.unlink = function() {
          var TargetResource = $injector.get("Dj");
          var action = TargetResource["::unlink::Space::contributors"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Space.contributors#updateById
             * @methodOf lbServices.Space.contributors
             *
             * @description
             *
             * Update a related item by id for contributors.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Space id
             *
             *  - `fk` – `{*}` - Foreign key for contributors
             *
             * @param {Object} postData Request data.
             *
             *  - `options` – `{object=}` -
             *
             *  - `data` – `{object=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
        R.contributors.updateById = function() {
          var TargetResource = $injector.get("Dj");
          var action = TargetResource["::updateById::Space::contributors"];
          return action.apply(R, arguments);
        };

            /**
             * @ngdoc method
             * @name lbServices.Space#owner
             * @methodOf lbServices.Space
             *
             * @description
             *
             * Fetches belongsTo relation owner.
             *
             * @param {Object=} parameters Request parameters.
             *
             *  - `id` – `{*}` - Space id
             *
             *  - `options` – `{object=}` -
             *
             *  - `refresh` – `{boolean=}` -
             *
             *  - `options` – `{object=}` -
             *
             * @param {function(Object,Object)=} successCb
             *   Success callback with two arguments: `value`, `responseHeaders`.
             *
             * @param {function(Object)=} errorCb Error callback with one argument:
             *   `httpResponse`.
             *
             * @returns {Object} An empty reference that will be
             *   populated with the actual data once the response is returned
             *   from the server.
             *
             * <em>
             * (The remote method definition does not provide any description.
             * This usually means the response is a `Dj` object.)
             * </em>
             */
        R.owner = function() {
          var TargetResource = $injector.get("Dj");
          var action = TargetResource["::get::Space::owner"];
          return action.apply(R, arguments);
        };


        return R;
      }]);


  module
  .factory('LoopBackAuth', function() {
    var props = ['accessTokenId', 'currentUserId', 'rememberMe'];
    var propsPrefix = '$LoopBack$';

    function LoopBackAuth() {
      var self = this;
      props.forEach(function(name) {
        self[name] = load(name);
      });
      this.currentUserData = null;
    }

    LoopBackAuth.prototype.save = function() {
      var self = this;
      var storage = this.rememberMe ? localStorage : sessionStorage;
      props.forEach(function(name) {
        save(storage, name, self[name]);
      });
    };

    LoopBackAuth.prototype.setUser = function(accessTokenId, userId, userData) {
      this.accessTokenId = accessTokenId;
      this.currentUserId = userId;
      this.currentUserData = userData;
    };

    LoopBackAuth.prototype.clearUser = function() {
      this.accessTokenId = null;
      this.currentUserId = null;
      this.currentUserData = null;
    };

    LoopBackAuth.prototype.clearStorage = function() {
      props.forEach(function(name) {
        save(sessionStorage, name, null);
        save(localStorage, name, null);
      });
    };

    return new LoopBackAuth();

    // Note: LocalStorage converts the value to string
    // We are using empty string as a marker for null/undefined values.
    function save(storage, name, value) {
      try {
        var key = propsPrefix + name;
        if (value == null) value = '';
        storage[key] = value;
      } catch (err) {
        console.log('Cannot access local/session storage:', err);
      }
    }

    function load(name) {
      var key = propsPrefix + name;
      return localStorage[key] || sessionStorage[key] || null;
    }
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('LoopBackAuthRequestInterceptor');
  }])
  .factory('LoopBackAuthRequestInterceptor', ['$q', 'LoopBackAuth',
    function($q, LoopBackAuth) {
      return {
        'request': function(config) {
          // filter out external requests
          var host = getHost(config.url);
          if (host && config.url.indexOf(urlBaseHost) === -1) {
            return config;
          }

          if (LoopBackAuth.accessTokenId) {
            config.headers[authHeader] = LoopBackAuth.accessTokenId;
          } else if (config.__isGetCurrentUser__) {
            // Return a stub 401 error for User.getCurrent() when
            // there is no user logged in
            var res = {
              body: { error: { status: 401 }},
              status: 401,
              config: config,
              headers: function() { return undefined; },
            };
            return $q.reject(res);
          }
          return config || $q.when(config);
        },
      };
    }])

  /**
   * @ngdoc object
   * @name lbServices.LoopBackResourceProvider
   * @header lbServices.LoopBackResourceProvider
   * @description
   * Use `LoopBackResourceProvider` to change the global configuration
   * settings used by all models. Note that the provider is available
   * to Configuration Blocks only, see
   * {@link https://docs.angularjs.org/guide/module#module-loading-dependencies Module Loading & Dependencies}
   * for more details.
   *
   * ## Example
   *
   * ```js
   * angular.module('app')
   *  .config(function(LoopBackResourceProvider) {
   *     LoopBackResourceProvider.setAuthHeader('X-Access-Token');
   *  });
   * ```
   */
  .provider('LoopBackResource', function LoopBackResourceProvider() {
    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setAuthHeader
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} header The header name to use, e.g. `X-Access-Token`
     * @description
     * Configure the REST transport to use a different header for sending
     * the authentication token. It is sent in the `Authorization` header
     * by default.
     */
    this.setAuthHeader = function(header) {
      authHeader = header;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#getAuthHeader
     * @methodOf lbServices.LoopBackResourceProvider
     * @description
     * Get the header name that is used for sending the authentication token.
     */
    this.getAuthHeader = function() {
      return authHeader;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#setUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @param {string} url The URL to use, e.g. `/api` or `//example.com/api`.
     * @description
     * Change the URL of the REST API server. By default, the URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.setUrlBase = function(url) {
      urlBase = url;
      urlBaseHost = getHost(urlBase) || location.host;
    };

    /**
     * @ngdoc method
     * @name lbServices.LoopBackResourceProvider#getUrlBase
     * @methodOf lbServices.LoopBackResourceProvider
     * @description
     * Get the URL of the REST API server. The URL provided
     * to the code generator (`lb-ng` or `grunt-loopback-sdk-angular`) is used.
     */
    this.getUrlBase = function() {
      return urlBase;
    };

    this.$get = ['$resource', function($resource) {
      var LoopBackResource = function(url, params, actions) {
        var resource = $resource(url, params, actions);

        // Angular always calls POST on $save()
        // This hack is based on
        // http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/
        resource.prototype.$save = function(success, error) {
          // Fortunately, LoopBack provides a convenient `upsert` method
          // that exactly fits our needs.
          var result = resource.upsert.call(this, {}, this, success, error);
          return result.$promise || result;
        };
        return resource;
      };

      LoopBackResource.getUrlBase = function() {
        return urlBase;
      };

      LoopBackResource.getAuthHeader = function() {
        return authHeader;
      };

      return LoopBackResource;
    }];
  });
})(window, window.angular);
