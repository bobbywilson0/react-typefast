/** @jsx React.DOM */
var React = require('react');
var Word = require('./word');
var Firebase = require('client-firebase');
var ReactFireMixin = require('reactfire');

module.exports = React.createClass({
  mixins: [ReactFireMixin],

  getInitialState: function() {
    return { index: 0, userInput: '', startedAt: null };
  },

  componentWillMount: function() {
    this.bindAsArray(new Firebase("https://typefast.firebaseio.com/quotes/"), "quotes");
  },

  handleChange: function(event) {
    if (this.state.startedAt === null) {
      this.startRace();
    }
    this.setState({userInput: event.target.value});
    if (this.wordMatches(event.target.value)) {
      this.setState({index: this.state.index + 1, userInput: ''});
      if (this.raceComplete()) {
        console.log(this.wpm());
      }
    }
  },

  startRace: function() {
    this.setState({startedAt: new Date()});
  },

  wpm: function() {
    return (this.quote().length / 5) / (((new Date() - this.state.startedAt) / 1000) / 60);
  },

  wordMatches: function(word) {
    return word == this.quote()[this.state.index];
  },

  raceComplete: function() {
    return this.state.index == (this.quote().length - 1);
  },

  highlightWord: function(index) {
    if (this.state.index === index) {
      return "highlight";
    }
  },

  quote: function() {
    if (this.state.quotes === undefined) {
      return [];
    } else {
      return this.state.quotes[0].text.split(/\b/);
    }
  },

  render: function() {
    var self = this;

    var renderWord = function(word, index) {
      return <Word key={index} index={index} cssClass={self.highlightWord(index)}>{word}</Word>
    }

    return(
      <div>
        <div>
          {self.quote().map(renderWord)}
        </div>
        <input type="text" ref="textInput" value={self.state.userInput} onChange={self.handleChange} />
      </div>
    )
  }
});
