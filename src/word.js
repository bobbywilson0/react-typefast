/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
  render: function() {
    return(
      <span currentWord={this.props.currentWord}
            className={this.props.cssClass}>{this.props.children}</span>
    )
  }
});
