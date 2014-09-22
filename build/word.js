/** @jsx React.DOM */

var Word = React.createClass({displayName: 'Word',
  render: function() {
    return(
      React.DOM.span({currentWord: this.props.currentWord, 
            className: this.props.cssClass}, this.props.children)
    )
  }
})
