/** @jsx React.DOM */

var Words = React.createClass({displayName: 'Words',
  getInitialState: function() {
    return {quote: [], index: 0};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({ quote: data.quote.split(' ') });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var words = this.state.quote;
    var wordIndex = this.state.index;

    return(
      React.DOM.div(null, 
        words.map(function(word, index) {
          var highlighted = "";
          if (wordIndex == index) {
            highlighted = "highlight";
          }
          return Word({index: index, cssClass: highlighted}, word)
        })
      )
    );
  }
});
