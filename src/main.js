/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;
var Lobby = require('./lobby');
var Game = require('./game')


var routes = (
  <Routes>
    <Route path="/" handler={Lobby} />
    <Route name="game" path="/game/:gameId" handler={Game} />
  </Routes>
);

React.renderComponent(routes, document.body);
