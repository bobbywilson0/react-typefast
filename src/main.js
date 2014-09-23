/** @jsx React.DOM */

var React = require('react');
var Game = require('./game');

React.renderComponent(<Game url="build/data.json" />, document.getElementById('app'));
