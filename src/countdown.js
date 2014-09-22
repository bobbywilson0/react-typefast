/** @jsx React.DOM */

var Countdown = React.createClass({
  getInitialState: function() {
    return { totalSeconds: this.props.totalSeconds };
  },

  render: function() {
    return (
      <div className="Countdown">
        <h1>{ this.state.totalSeconds }</h1>
      </div>
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
