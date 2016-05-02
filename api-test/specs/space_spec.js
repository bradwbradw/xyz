
var express = require("express")
  , request = require("supertest-as-promised");

var config = require('../../config');
var constants = require('../constants');

var urls = constants.urls.solidus;

var apiUrl = config.solidusApi;
var apiKey = config.solidusApiKey;