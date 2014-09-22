/** @jsx React.DOM */

var Word = React.createClass({
  render: function() {
    return(
      <span currentWord={this.props.currentWord}
            className={this.props.cssClass}>{this.props.children}</span>
    )
  }
})
