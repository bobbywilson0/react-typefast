/** @jsx React.DOM */
// <div id="countdown"><Countdown totalSeconds="3" /></div>

var Game = React.createClass({
  getInitialState: function() {
    return { quote: [], index: 0, userInput: '', startedAt: null };
  },

  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({ quote: data.quote.split(/\b/) });
        this.refs.textInput.getDOMNode().focus();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
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
    return this.state.quote.length / (((new Date() - this.state.startedAt) / 1000) / 60);
  },

  wordMatches: function(word) {
    return word == this.state.quote[this.state.index];
  },

  raceComplete: function() {
    return this.state.index == (this.state.quote.length - 1);
  },

  highlightWord: function(index) {
    if (this.state.index === index) {
      return "highlight";
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
          {self.state.quote.map(renderWord)}
        </div>
        <input type="text" ref="textInput" value={self.state.userInput} onChange={self.handleChange} />
      </div>
    )
  }
});

React.renderComponent(<Game url="build/data.json" />, document.getElementById('app'));
