/** @jsx React.DOM */
var React = require('react');
var Game = require('./game');
var Firebase = require('client-firebase');
var ReactFireMixin = require('reactfire');

module.exports = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function() {
    return { games: []}
  },

  componentWillMount: function() {
    this.firebaseRef = new Firebase("https://typefast.firebaseio.com/games");
    this.bindAsArray(this.firebaseRef, "games");
  },

  games: function() {
    var games = [];
    this.firebaseRefs["games"].once('value', function(snap) {
      snap.forEach(function(game) {
        games.push(game);
      });
    });
    return games;
  },

  newGame: function() {
    game = this.firebaseRefs["games"].push({
      status: "open",
      startedAt: new Date(),
      players: [
        {
          name: 'bobby',
          progress: 0
        }
      ]
    })
    return game.name();
  },

  render: function() {
    var self = this;

    return(
      <div>
        <ul>
          {self.games().map(function(game) {
            return <li><a href={"/#/game/" + game.name()}>game</a></li>
          })}
        </ul>
        <a onClick={self.newGame} href="#">New Game</a>
      </div>
    )
  }


});
