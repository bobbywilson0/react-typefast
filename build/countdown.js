/** @jsx React.DOM */

var Countdown = React.createClass({displayName: 'Countdown',
  getInitialState: function() {
    return { totalSeconds: this.props.totalSeconds };
  },

  render: function() {
    return (
      React.DOM.div({className: "Countdown"}, 
        React.DOM.h1(null,  this.state.totalSeconds)
      )
    );
  },

  componentDidMount: function() {
    var count = function() {
      this.setState({ totalSeconds: this.state.totalSeconds -= 1 });
      if (this.state.totalSeconds < 1) {
        clearInterval(tick);
        React.unmountComponentAtNode(document.getElementById('countdown'));
      }
    };

    var tick = setInterval(count.bind(this), 1000);
  }
});
